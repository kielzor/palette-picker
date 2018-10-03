const express = require('express')
var bodyParser = require('body-parser')
const app = express()

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
  response.send('Hello World!')
})

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
