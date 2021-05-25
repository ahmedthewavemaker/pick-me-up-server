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
<<<<<<< HEAD
            .where('id', game_id)
=======
            .where(game.id, game_id)
>>>>>>> 5a6a73339ad65d134be505f0d5928ce0a9b587c8
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
