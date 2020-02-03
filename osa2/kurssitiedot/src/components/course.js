import React from 'react'

const Header = (props) => {
    return (
        <h2>
          {props.course}
        </h2>
    )
  }

const Content = ({ parts }) => {
    return (
        <>
          {parts.map((part) =>
              <Part key={part.id} part={part}/>
          )}
        </>
    )
}

const Part = ({ part }) => {
    return (
        <p>
           {part.name} {part.exercises}
        </p>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce( (s, p) => s + p.exercises, 0)
    return (
        <p>
          total of {total} exercises
        </p>
    )
}

const Course = ({ course }) => {
    return (
        <> 
          <Header course={course.name}/>
          <Content parts={course.parts}/>
          <Total parts={course.parts}/>
        </>
    )
}

export default Course