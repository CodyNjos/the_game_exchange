import axios from 'axios';
import { put, takeEvery, } from 'redux-saga/effects';

//makes post request to add game to library
function* addGame(action) {
    console.log('adding to collection',action.payload)
    yield axios.post('/api/games/add', action.payload)
    yield put({ type: 'GET_GAMES', payload: '' })
}
//makes post request to add game to wishlist
function* addWishlist(action) {
    console.log('adding to wishlist', action.payload)
    yield axios.post('/api/games/add/wish', action.payload)
    yield put({ type: 'GET_GAMES', payload: '' })
}
//makes a delete request to remove game
function* deleteGame(action) {
    console.log('deleteing game with id', action.payload)
    yield axios.delete(`/api/games/delete/${action.payload}`)
    yield put({ type: 'GET_GAMES', payload: '' })
}
function* editTradeable(action) {
    console.log('editing tradeable', action.payload)
    yield axios.put(`/api/edit/tradeable/${action.payload.id}`, action.payload)
    yield put({type: 'EDIT_GAME', payload: action.payload.id})
}
// listener for actions in this saga
function* addGameSaga() {
    yield takeEvery('ADD_GAME', addGame);
    yield takeEvery('ADD_WISHLIST', addWishlist);
    yield takeEvery('DELETE_GAME', deleteGame);
    yield takeEvery('EDIT_TRADEABLE', editTradeable)
  }

  export default addGameSaga;