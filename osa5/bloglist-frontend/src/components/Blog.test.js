import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is',
    author: 'done with react-testing-library',
    url: 'eikuulusulle.fi',
    likes: 3
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is'
  )
  expect(component.container).toHaveTextContent(
    'done with react-testing-library'
  )
})

test('show stuff shows stuff', async () => {
  const blog = {
    title: 'Component testing is',
    author: 'done with react-testing-library',
    url: 'eikuulusulle.fi',
    likes: 3,
    user: {
      name: 'ukko'
    }
  }

  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} show={mockHandler} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'eikuulusulle.fi'
  )
  expect(component.container).toHaveTextContent(
    '3'
  )
})

test('like is pressed when like is pressed', async () => {
  const blog = {
    title: 'Component testing is',
    author: 'done with react-testing-library',
    url: 'eikuulusulle.fi',
    likes: 3,
    user: {
      name: 'ukko'
    }
  }

  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} like={mockHandler} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)

  const button2 = component.getByText('like this blog')
  fireEvent.click(button2)
  fireEvent.click(button2)

  expect(mockHandler.mock.calls.length).toBe(2)
})