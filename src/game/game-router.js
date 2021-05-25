const express = require('express')
const GameService = require('./game-service')


const gameRouter = express.Router()
const jsonBodyParser = express.json()


const serializeGame = game => ({
    id: game.id,
    name: game.name,
    maxplayers: game.maxplayers,
    location: game.location,
    date: game.date
})

gameRouter
.route('/')
//GET
.get((req, res, next)=> {
    const knexInstance = req.app.get('db')
    GameService.getGames(knexInstance)

    .then(games => {
        res 
            .status(200)
            .json(games.map(serializeGame))
    })

    .catch(next)
})
//POST
.post(jsonBodyParser, (req, res, next)=> {
    const {name, maxplayers, location, date} = req.body;
    const newGame = {name, maxplayers, location, date}

    if(!name){
        return res.json({error: {message: `Name is required!`}})
    }

    if(!maxplayers){
        return res.json({error: {message: `Player number is required!`}})
    }

    if(!location){
        return res.json({error: {message: `Game location is required!`}})
    }

    if(!date){
        return res.json({error: {message: `Date of game is required!`}})
    }

    GameService.insertGame(
        req.app.get('db'), newGame
    )

    .then(game => {

        res
            .status(201)
            .location(`/:${game.id}`)
            .json(serializeGame(game))
    })
    .catch(next)
})

gameRouter
.route('/:game_id')
.all((req, res, next) => {
    if(isNaN(parseInt(req.params.game_id))){
        return res  
                    .status(404)
                    .json({error:`invalid id`})
    }

    GameService.getGameById(
        req.app.get('db'),
        req.params.game_id
    )

    .then(game => {
        if(!game){
            return res      
                    .status(404)
                    .json({error: `Game does not exist`})
        }

        res.game = game
            next()
    })
    .catch(next)
})
//GET by id
.get((req, res, next)=> {
    res.json(serializeGame(res.game))
})
//DELETE
.delete((req, res, next) => {
    GameService.deleteGame(
      req.app.get('db'),
      req.params.game_id
    )
      .then( rowsAffected => {
        console.log(rowsAffected + ' has been deleted')

    
    
      .then( rowsAffected => {
        console.log(rowsAffected)
        if(rowsAffected === 0){
            return res.sendStatus(404)
        }


        res.status(204).end()
      })
      .catch(next)
    })
})


module.exports = gameRouter