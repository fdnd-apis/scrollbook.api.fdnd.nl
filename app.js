require('dotenv').config()
const express = require('express')

const indexRoute = require('./routes/index')
const errorRoute = require('./routes/error')
const bookRoute = require('./routes/book')
const authorRoute = require('./routes/author')
const categoryRoute = require('./routes/category')

module.exports = express()
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  .use('/', indexRoute)
  // We will define routes here.
  .use('/v1/book', bookRoute)
  .use('/v1/author', authorRoute)
  .use('/v1/category', categoryRoute)
  .use(errorRoute)
