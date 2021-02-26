import {useSelector, useDispatch} from "react-redux"
import {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import './HomePage.css'
function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory()
    const store = useSelector(store => store);
    useEffect(() => {
        dispatch({ type: 'GET_GAMES' });
    }, []);
    const tradeable = store.games.filter(games => games.tradeable === true && games.wish_list === false)
    const viewProfile = (user) => {
        console.log(user)
        history.push(`/profiles/${user}`)
    }
    return(
        <>
        <h2>Home Page</h2>
        {tradeable.map(game => {
            return(
             <div key = {game.id} className = 'cardWrap'>  
             <div className="gameCard" > 
             {game.game_name} <br/>
             <img src = {game.img_url}/>
             <p>Offered By : {game.username}</p>
             <button onClick={() => viewProfile(game.user_id)}>View Profile</button>
             </div>
             </div>
            )
        })}
       
        </>
    )
}

export default HomePage