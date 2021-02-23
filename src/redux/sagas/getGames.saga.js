import axios from 'axios';
import { put, takeLatest, } from 'redux-saga/effects';

//makes get request to get all games from the DB
function* getAllGames() {
    try{
    console.log("in get all games")
    const games = yield axios.get('/api/games')
    console.log(games.data)
    }catch{
        console.log('error in get ')
    }
}


// listener for actions in this saga
function* getGamesSaga() {
    yield takeLatest("GET_GAMES", getAllGames);
    
  }

  export default getGamesSaga;