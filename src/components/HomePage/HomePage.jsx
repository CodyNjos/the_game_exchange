import {useSelector, useDispatch} from "react-redux"
import {useEffect, useState} from 'react'
import './HomePage.css'
function HomePage() {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    useEffect(() => {
        dispatch({ type: 'GET_GAMES' });
    }, []);
    const tradeable = store.games.filter(games => games.tradeable === true && games.wish_list === false)
    
    return(
        <>
        <p>Home Page</p>
        {tradeable.map(game => {
            return(
             <div key = {game.id}> 
             {game.game_name} <br/>
             <img src = {game.img_url}/>
             </div>
            )
        })}
       
        </>
    )
}

export default HomePage