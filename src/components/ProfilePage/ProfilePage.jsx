import ProfileAddCollection from '../ProfileAddCollection/ProfileAddCollection'
import ProfileAddWishlist from '../ProfileAddWishlist/ProfileAddWishlist'
import {useSelector, useDispatch} from "react-redux"
import {useEffect, useState} from 'react'
function ProfilePage() {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    useEffect(() => {
        dispatch({ type: 'GET_GAMES' });
    }, []);

    const usersGames = store.games.filter(games => games.user_id === store.user.id)
    const usersCollection = usersGames.filter(games => games.wish_list === false)
    const usersTradeable = usersGames.filter(games => games.tradeable === true)
    const usersWish = usersGames.filter(games=> games.wish_list === true)
    return(
        <>
        <p>Profile Page</p>
        <h2>Tradeable Games</h2>
        {usersTradeable.map(game => {
            return(
            <div className="gameCard" key = {game.id}>
                <p>{game.game_name}</p><br/>
                <img src = {game.img_url}/>
            </div>
        )})}
        <br/>
        <h2>Wish List</h2>
        <ProfileAddWishlist/>
        {usersWish.map(wish => {
            return(
            <div className="gameCard" key = {wish.id}>
                <p>{wish.game_name}</p><br/>
                <img src = {wish.img_url}/>
            </div>
        )})}
        <br/>
        <h2>Collecton</h2>
        <ProfileAddCollection/>
        {usersCollection.map(game => {
            return(
            <div className="gameCard" key = {game.id}>
                <p>{game.game_name}</p><br/>
                <img src = {game.img_url}/>
            </div>
        )})}
        
        </>
    )
}

export default ProfilePage