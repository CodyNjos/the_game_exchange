import axios from 'axios';
import { put, takeLatest, } from 'redux-saga/effects';

//makes post request to add game to library
function* addGame(action) {
    console.log('adding to collection',action.payload)
    yield axios.post('/api/games/add', action.payload)
}
//makes post request to add game to wishlist
function* addWishlist(action) {
    console.log('adding to wishlist', action.payload)
    yield axios.post('/api/games/add/wish', action.payload)
}

// listener for actions in this saga
function* addGameSaga() {
    yield takeLatest('ADD_GAME', addGame);
    yield takeLatest('ADD_WISHLIST', addWishlist)
  }

  export default addGameSaga;