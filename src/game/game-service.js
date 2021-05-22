const GameService={

    getGames(db){
        return db('soccer_games')
            .select(
                '*'
            )
    },

    getGameById(db, game_id){
        return db
            .from('soccer_games')
            .select(
                '*'
            )
            .where(game.id, game_id)
            .first()
    },

    insertGame(db, newGame){
        return db   
            .insert(newGame)
            .into('soccer_games')
            .returning('*')
            .then(rows => {
                return rows[0] })
           
    },

    deleteGame(knex, id){
        return knex('soccer_games')
        .where({id})
        .delete()
    }
}

module.exports = GameService
