
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ProfileOther() {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const params = useParams()

    useEffect(() => {
        console.log('params are', params)
        dispatch({ type: "GET_USER_GAMES", payload: params.id })
    }, []);
    const usersTradeable = store.userGames.filter(games => games.tradeable === true)
    const usersWish = store.userGames.filter(games => games.wish_list === true)
    return (
        <>
            {store.userGames.length === 0 ?
                <></>
                :
                <>
                <h1>{store.userGames[0].username}'s Profile</h1>
                <h3>Contact At</h3>
                <h4>{store.userGames[0].email}</h4>
                </>
            }
            <h2>Tradeable Games</h2>
            {usersTradeable.map(game => {
                return (
                    <div key={game.id} className="cardWrap">
                        <div className="gameCard" >
                            <p>{game.game_name}</p><br />
                            <img src={game.img_url} />
                        </div>
                    </div>
                )
            })}
            <br />
            <h2>Wish List</h2>
            {usersWish.map(wish => {
                return (
                    <div key={wish.id}className="cardWrap">
                        <div className="gameCard" >
                            <p>{wish.game_name}</p><br />
                            <img src={wish.img_url} />
                        </div>
                    </div>
                )
            })}

        </>
    )
}

export default ProfileOther