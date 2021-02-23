import axios from 'axios';
import { put, takeLatest, } from 'redux-saga/effects';

function* addGame(action) {
    console.log(action.payload)
    const games = yield axios.post('/api/games/add', action.payload)
}

function* addGameSaga() {
    yield takeLatest('ADD_GAME', addGame);
    
  }

  export default addGameSaga;