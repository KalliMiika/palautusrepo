const { ApolloServer, UserInputError, gql } = require('apollo-server')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

const MONGODB_URI = 'mongodb+srv://puhelin:puhla@cluster0-osdr6.mongodb.net/library?retryWrites=true&w=majority'
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      let ham = Book.find({})
      if (args.author) {
        ham = ham.filter(b => b.author.name === args.author)
      }
      if (args.genre) {
        ham = ham.filter(b => b.genres.includes(args.genre))
      }
      return ham
    },
    allAuthors: () => {
      const authors = Author.find({})
      const books = Book.find({})
      const tmp = authors.map(a => {
        return {
          name: a.name,
          //bookCount: books.filter(b => b.author.name === a.name).length,
          //id: a.id,
          born: a.born
        }
      })
      return (
        tmp
      )
    }
  },
  Book: {
    author: (root) => {
      return {
        name: root.name
      }
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = Author.findOne({ name: book.author})
      let newAuthor = false
      if (!author) {
        author = new Author({ name: book.author })
        newAuthor = true

      }
      const book = new Book({ ...args, author: author})
      try {
        await book.save()
        if (newAuthor) {
          await author.save()
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }

      const updatedAuthor = {...author, born: args.setBornTo}
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})