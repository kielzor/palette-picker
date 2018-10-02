const express = require('express')
var bodyParser = require('body-parser')
const app = express()

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.listen(app.get('port'), () => {
  console.log(`App is running on ${app.get('port')}`)
})