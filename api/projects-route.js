const express = require('express')
const router = express.Router()
const knex = require('knex')
const knexConfig = require('../knexfile.js')

const db = knex(knexConfig.development)

router.get('/', async (req, res) => {
    try {
        const projects = await db('projects')
        res.status(200).json(projects)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/', async (req, res) => {
    const { name, description } = req.body
    req.body = { ...req.body, completed: 0 }
    if (!name || !description) {
        res.status(404).json({ message: 'Provide a name and a description for the project.' })
    }
    try {
        const project = await db('projects').insert(req.body)
        res.status(201).json(project)
    } catch (error) {
        res.status(500).json({ error: 'An error trying to add the project to the database.' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const act = await db('projects')
            .innerJoin('actions', 'actions.id', 'projects.id')
            .select('actions.*')
            .where('projects.id', req.params.id)
        const proj = await db('projects').where('id', req.params.id)
        proj
            ? res.status(200).json({
                  ...proj[0],
                  actions : act,
              })
            : res.status(404).json({ errorMessage: 'A project with that ID does not exist.' })
    } catch (error) {
        res.status(500).json({ error: 'An error occuried while trying to access the project from the database.' })
    }
})



module.exports = router
