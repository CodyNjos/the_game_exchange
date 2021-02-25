import axios from 'axios';
import { put, takeLatest, } from 'redux-saga/effects';

//makes get request to get all games from the DB
function* getAllGames() {
    try{
    console.log("in get all games")
    const games = yield axios.get('/api/games')
    yield put ({type: 'SET_GAMES', payload: games.data})
    }catch{
        console.log('error in get ')
    }
}

function* getUserGames(action) {
    console.log("in get all games", action.payload)  
    try{
    const games = yield axios.get(`/api/games/${action.payload}`)
    yield put ({type: 'SET_USER_GAMES', payload: games.data})
    }catch{
        console.log('error in get user games')
    }
}

// listener for actions in this saga
function* getGamesSaga() {
    yield takeLatest("GET_GAMES", getAllGames);
    yield takeLatest("GET_USER_GAMES", getUserGames)
    
  }

  export default getGamesSaga;