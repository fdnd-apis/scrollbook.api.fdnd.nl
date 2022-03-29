const express = require('express')
const Author = require('./../models/Author.model')
const AuthorController = require('./../controllers/Author.controller')

module.exports = express
  .Router()

  .get('/', async (req, res, next) => {
    try {
      res.json(await AuthorController.getAll())
    } catch (err) {
      next(err)
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const author = req.body
      res.json(await AuthorController.create(new Author(author)))
    } catch (err) {
      next(err)
    }
  })
