const express = require('express')
const router = express.Router()
const knex = require('knex')
const knexConfig = require('../knexfile')

const db = knex(knexConfig.development)

router.post('/', async (req, res) => {
    const { description, notes } = req.body
    req.body = { ...req.body, completed: 0 }
    if (!description || !notes) {
        res.status(404).json({ message: 'Please provide a description and notes for the action.' })
    }
    try {
        const action = await db('actions').insert(req.body)
        res.status(201).json(action)
    } catch (error) {
        res.status(500).json({ error: 'An error occuried while trying to add the action to the database.' })
    }
})

router.get('/', async (req, res) => {
    try {
        const actions = await db('actions')
        res.status(200).json(actions)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router
