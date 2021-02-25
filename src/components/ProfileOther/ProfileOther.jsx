
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ProfileOther() {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const params = useParams()
    
    useEffect(() => {
        console.log('params are',params)
        dispatch ({type:"GET_USER_GAMES", payload: params.id})
    }, []);
    const usersTradeable = store.userGames.filter(games => games.tradeable === true)
    const usersWish = store.userGames.filter(games => games.wish_list === true)
    return (
        <>
            <p>Profile other Page</p>
            <h2>Tradeable Games</h2>
            {usersTradeable.map(game => {
                return (
                    <div className="gameCard" key={game.id}>
                        <p>{game.game_name}</p><br />
                        <img src={game.img_url} />
                    </div>
                )
            })}
            <br />
            <h2>Wish List</h2>
            {usersWish.map(wish => {
                return (

                    <div className="gameCard" key={wish.id}>
                        <p>{wish.game_name}</p><br />
                        <img src={wish.img_url} />
                    </div>

                )
            })}
           
        </>
    )
}

export default ProfileOther