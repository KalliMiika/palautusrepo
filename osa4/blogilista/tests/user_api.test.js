const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

test('username must not be too short', async () => {

  const newUser = {
    username: 'Ku',
    name: 'Ukko',
    password: 'kuu'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('password must not be too short', async () => {

  const newUser = {
    username: 'Kuu',
    name: 'Ukko',
    password: 'ku'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})