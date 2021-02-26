const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//GET ALL FROM USER
router.get('/:id', (req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM games WHERE user_id = ${id}`;
    pool.query(query)
        .then(result => {
            res.send(result.rows)
        }).catch(err => {
            console.log('Error in get all games', err)
            res.sendStatus(500)
        })
})


//GET ALL GAMES ROUTER
router.get('/', (req, res) => {
    const query = `SELECT * FROM games`;
    pool.query(query)
        .then(result => {
            res.send(result.rows)
        }).catch(err => {
            console.log('Error in get all games', err)
            res.sendStatus(500)
        })
});

//GET ONE GAME
router.get('/edit/:id', (req,res) => {
    const id = req.params.id
    const query = `SELECT * FROM games WHERE id = ${id}`
    pool.query(query)
        .then(result => {
            res.send(result.rows)
        }).catch(err => {
            console.log('Error in get all games', err)
            res.sendStatus(500)
        })
})

//ADD GAME TO COLLECTION ROUTER
router.post('/add', (req, res) => {
    console.log(req.body)
    const query = `INSERT INTO "games" ("user_id", "game_name", "img_url") 
    VALUES ($1, $2, $3);`
    pool.query(query, [req.body.user_id, req.body.game_name, req.body.img_url])
        .then(
            console.log(req.body.game_name, "added to user", req.body.user_id + "'s collection"),
            res.sendStatus(201)
        )
        .catch(err => {
            console.log('error in post', err)
        })
});


//ADD TO WISHLIST ROUTER
router.post('/add/wish', (req, res) => {
    console.log(req.body)
    const query = `INSERT INTO "games" ("user_id", "game_name", "img_url", wish_list) 
    VALUES ($1, $2, $3, $4);`
    pool.query(query, [req.body.user_id, req.body.game_name, req.body.img_url, req.body.boolean])
        .then(
            res.sendStatus(201)
        )
        .catch(err => {
            console.log('error in post', err)
        })
});


//DELTE GAMES ROUTER
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    console.log('Deleting game at id:', id);
    const queryText = `DELETE FROM "games" WHERE "id" = $1;`;

    pool.query(queryText, [id]).then(() => {
        console.log(`Deleted at id: ${id} successfully`);
        res.sendStatus(204);
    }).catch(err => {
        console.log('Error in delete', err);
        res.sendStatus(500);
    });
});


module.exports = router
