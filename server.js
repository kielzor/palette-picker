const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const cors = require('express-cors')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});
app.set('port', process.env.PORT || 3000)
app.use(express.static('public'))

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then(projects => response.status(200).json(projects))
    .catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`)
})

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of ['name']) {
    if (!project[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` })
    }
  }

  database('projects').insert(project, 'id')
    .then( project => response.status(201).json({ id: project[0] }) )
    .catch( error => response.status(500).json({ error }) )
})

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;

  for (let requiredParameter of ['name', 'hex_one', 'hex_two', 'hex_three', 'hex_four', 'hex_five'
  , 'project_id'
]) {
    if (!palette[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { name: <String>, hex_one: <String>, two: <String>, hex_three: <String>, hex_four: <String>, hex_five: <String>, project_id: <Integer> }. You're missing a "${requiredParameter}" property.` })
    }
  }

  database('palettes').insert(palette, 'id')
    .then( palette => response.status(201).json({ id: palette[0] }) )
    .catch( error => response.status(500).json({ error }) )
})
