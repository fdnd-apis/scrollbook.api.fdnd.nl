const express = require('express')
const Book = require('./../models/Book.model')
const BookController = require('./../controllers/Book.controller')

module.exports = express
  .Router()

  .get('/', async (req, res, next) => {
    try {
      res.json(await BookController.getAll())
    } catch (err) {
      next(err)
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const book = req.body
      res.json(await BookController.create(new Book(book)))
    } catch (err) {
      next(err)
    }
  })
