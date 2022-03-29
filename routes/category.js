const express = require('express')
const Category = require('./../models/Category.model')
const CategoryController = require('./../controllers/Category.controller')

module.exports = express
  .Router()

  .get('/', async (req, res, next) => {
    try {
      res.json(await CategoryController.getAll())
    } catch (err) {
      next(err)
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const category = req.body
      res.json(await CategoryController.create(new Category(category)))
    } catch (err) {
      next(err)
    }
  })
