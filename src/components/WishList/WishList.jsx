import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
function WishList() {
    const dispatch = useDispatch();
    const history = useHistory()
    const store = useSelector(store => store);
    useEffect(() => {
        dispatch({ type: 'GET_GAMES' });
    }, []);
    const wishlist = store.games.filter(games => games.wish_list === true)
    const viewProfile = (user) => {
        console.log(user)
        history.push(`/profiles/${user}`)
    }
    return (
        <>
            <p>Wish List Page</p>
            {wishlist.map(games => {
                return (
                    <div key={games.id} className='cardWrap'>
                        <div className="gameCard" >
                            <p>{games.game_name}</p> <br />
                            <img src={games.img_url} />
                            <p>{games.username} is looking for this</p>
                            <button onClick = {() => viewProfile(games.user_id)}>View Profile</button>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default WishList