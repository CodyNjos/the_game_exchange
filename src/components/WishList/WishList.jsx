import {useSelector, useDispatch} from "react-redux"
import {useEffect, useState} from 'react'

function WishList() {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    useEffect(() => {
        dispatch({ type: 'GET_GAMES' });
    }, []);
    const wishlist = store.games.filter(games => games.wish_list === true)
    return(
        <>
        <p>Wish List Page</p>
        {wishlist.map(games => {
            return(
            <div className="gameCard" key = {games.id}>
                <p>{games.game_name}</p> <br/>
                <img src={games.img_url}/>
                <p>{games.user_id} is looking for this</p>
            </div>
        )})}
        </>
    )
}

export default WishList