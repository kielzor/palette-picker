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

app.get('/', (request, response) => {
  response.send('Hello World!')
})

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
