const express = require('express')
const projectsRoute = require('./api/projects-route.js')
const actionsRoute = require('./api/actions-route.js')


const server = express()

server.use(express.json())

server.use('/api/projects', projectsRoute)
server.use('/api/actions', actionsRoute)


server.get('/', (req, res) => {
    res.send('Server Running!!')
})



const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);

