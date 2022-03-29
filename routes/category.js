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

  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      res.json(await CategoryController.getById(id))
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

  .patch('/', async (req, res, next)=>{
    try {
      const category = req.body
      res.json(await CategoryController.update(new Category(category)))
    } catch (err) {
      next(err)
    }
  })

  .delete('/', async (req, res, next)=>{
    try {
      const category_id = req.body.category_id
      res.json(await CategoryController.delete(category_id))
    } catch (err) {
      next(err)
    }
  })
