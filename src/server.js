require('dotenv').config();
const app = require('./app')
const { DATABASE_URL,PORT } = require('./config')
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL
})

app.set('db', db)

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})