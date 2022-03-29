const express = require('express')

module.exports = express
  .Router()

  .get('/', (req, res) => {
    res.json({
      message:
        'Welcome to scrollbook.api.fdnd.nl! Please use the resources below to expore this API.',
      github: 'https://github.com/fdnd-apis/scrollbook',
      spec: 'https://scrollbook.api.fdnd.nl/v1',
      docs: 'Not ready yet',
    })
  })

  .get('/v1', (req, res) => {
    res.json({ openapi: 'Open API docs here soon.' })
  })
