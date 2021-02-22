const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//GET ALL GAMES ROUTER
router.get('/', (req, res) => {
    const query = `SELECT * FROM games`;
    pool.query(query)
    .then( result => {
        res.send(result.rows)
    }).catch( err => {
        console.log('Error in get all games', err)
        res.sendStatus(500)
    })
  });
  module.exports = router


//ADD GAMES ROUTER
  router.post('/add', (req, res) => {
    const query = `INSERT INTO "games" ("user_id", "game_name", "img_url") 
    VALUES ($1, $2, $3);`
    pool.query(query,[req.body.user_id, req.body.game_name, req.body.img_url])
    .then (
        res.send(201)
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