const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

//EDIT GAME TRADEABLE ROUTER
router.put('/tradeable/:id', rejectUnauthenticated, (req, res) => {
    // req.body should contain a category_id to add to this favorite image
    console.log(req.body)
    const id = req.params.id;
    const boolean = req.body.boolean;
    console.log(`Updating the game with id:${id} to set its tradeable value to:${boolean}`);
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

  router.put('/details/:id', rejectUnauthenticated, (req, res) => {
    // req.body should contain a category_id to add to this favorite image
    const id = req.params.id;
    const details = req.body.details;
    console.log(`Updating the game with id:${id}`);
    console.log(id, details)
    const queryText = `UPDATE "games" SET "details" = $1
                      WHERE "id" = $2;`;
  
    pool.query(queryText, [details, id]).then(() => {
      console.log(`Updated successfully`);
      res.sendStatus(200);
    }).catch(err => {
      console.log('Error in update', err);
      res.sendStatus(500);
    });
  });



module.exports = router
