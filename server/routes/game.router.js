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

  //EDIT GAMES ROUTER
  router.put('/tradeable/:id', (req, res) => {
    // req.body should contain a category_id to add to this favorite image
    const id = req.params.id;
    const boolean = req.body.boolean;
    console.log(`Updating the game with id:${id}`);
    console.log(id, boolean)
    const queryText = `UPDATE "games" SET "tradeable" = $1
                      WHERE "id" = $2;`;
  
    pool.query(queryText, [boolean, id]).then(() => {
      console.log(`Updated successfully`);
      res.sendStatus(200);
    }).catch(err => {
      console.log('Error in update', err);
      res.sendStatus(500);
    });
  });
  