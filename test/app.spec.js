<<<<<<< HEAD
const knex = require('knex')
const app = require('../src/app')
const {gameArray} = require('./game-fixture')

describe('App', () => {
  it('GET / responds with 200 containing "Hello, World Cup!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, World Cup!')
  })
})


describe('Game Endpoints', function () {
  let db

  before('make knex instance', () => {
    
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)

  })

  after('disconnect from db', () => db.destroy())

  beforeEach('clean the table', () => db.raw('TRUNCATE soccer_games RESTART IDENTITY CASCADE'))

  afterEach('cleanup', () => db.raw('TRUNCATE soccer_games RESTART IDENTITY CASCADE'))

  describe(`GET /api/games`, () => {
    context(`Given no games`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/games/')
          .expect(200, [])
      })
    })

    context('Given there are games in the database', () => {
      const testGame = gameArray();

      beforeEach('insert game', () => {
        return db
          .into('soccer_games')
          .insert(testGame)
      })

      it('responds with 200 and all of the games', () => {
        return supertest(app)
          .get('/api/games/')
          .expect(200, testGame)
      })
    })
  })

  describe(`POST /api/create`, () => {
    const testGame = gameArray();
    beforeEach('insert game', () => {
      return db
        .into('soccer_games')
        .insert(testGame.map(item=> {
          const game = {...item}
          delete game.id
          return game
        }))
    })

    it(`creates a game, responding with 201 and the new game`, () => {
      const newGame = { 
        id: 3,
        name: "arsenal lovers",
        maxplayers: 20,
        location: "Stryker Park 4",
        date: "2021-06-16T04:00:00.000Z"
      }
      return supertest(app)
        .post('/api/games')
        .send(newGame)
        .expect(201)
        .expect(res => {
          expect(res.body.id).to.eql(newGame.id)
          expect(res.body.name).to.eql(newGame.name)
          expect(res.body.maxplayers).to.eql(newGame.maxplayers)
          expect(res.body.location).to.eql(newGame.location)
          expect(res.body.date).to.eql(newGame.date)

        })
    })
  })

  describe(`DELETE /api/game_id`, () => {
    context('Given there are games in the database', () => {
      const testGame = gameArray();
   
      beforeEach('insert game', () => {
        return db
          .into('soccer_games')
          .insert(testGame)
         
      })

      it('responds with 204 and removes the games', () => {
        const idToRemove = 2
        const expectedGame = testGame.filter(game => game.id !== idToRemove)
        return supertest(app)
          .delete(`/api/games/${idToRemove}`)
          .expect(204)
          .then(res =>
            supertest(app)
              .get(`/api/games`)
              .expect(expectedGame)
          )
      })
    })
  })



=======

const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })
>>>>>>> 5a6a73339ad65d134be505f0d5928ce0a9b587c8
})