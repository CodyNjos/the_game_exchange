import axios from 'axios';
import { put, takeEvery, } from 'redux-saga/effects';

//makes get request to get all games from the DB
function* getAllGames(action) {
    try{
    console.log("in get all games", action.payload)
    const games = yield axios.get(`/api/games?search=${action.payload}`)
    yield put ({type: 'SET_GAMES', payload: games.data})
    }catch(err){
        console.log('error in get all', err)
    }
}

function* getUserGames(action) {
    console.log("in get user games", action.payload)  
    try{
    const games = yield axios.get(`/api/games/${action.payload}`)
    yield put ({type: 'SET_USER_GAMES', payload: games.data})
    }catch{
        console.log('error in get user games')
    }
}

function* editGame(action) {
    try{
        const games = yield axios.get(`/api/games/edit/${action.payload}`)
        yield put ({type: 'SET_EDIT_GAMES', payload: games.data})
        }catch{
            console.log('error in get user games')
        }
    
}

// listener for actions in this saga
function* getGamesSaga() {
    yield takeEvery("GET_GAMES", getAllGames);
    yield takeEvery("GET_USER_GAMES", getUserGames)
    yield takeEvery("EDIT_GAME", editGame)
    
  }

  export default getGamesSaga;