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

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      res.json(await BookController.getById(id))
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

  .patch('/', async (req, res, next)=>{
    try {
      const book = req.body
      res.json(await BookController.update(new Book(book)))
    } catch (err) {
      next(err)
    }
  })

  .delete('/', async (req, res, next)=>{
    try {
      const book_id = req.body.book_id
      res.json(await BookController.delete(book_id))
    } catch (err) {
      next(err)
    }
  })
