import ProfileAddCollection from '../ProfileAddCollection/ProfileAddCollection'
import ProfileAddWishlist from '../ProfileAddWishlist/ProfileAddWishlist'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import {Button} from "@material-ui/core"
function ProfilePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    useEffect(() => {
        dispatch({ type: 'GET_GAMES', payload:"" });
    }, [dispatch]);
    
    
    const usersGames = store.games.filter(games => games.user_id === store.user.id)
    
    const usersCollection = usersGames.filter(games => games.wish_list === false)
    const usersTradeable = usersGames.filter(games => games.tradeable === true)
    const usersWish = usersGames.filter(games => games.wish_list === true)
    
    
    const deleteGame = (id) => {
        console.log(id)
        dispatch({ type: 'DELETE_GAME', payload: id })
    }
    return (
        <>
            <p>Profile Page</p>
            <h2>Tradeable Games</h2>
            <div className='cardWrap'>
                {usersTradeable.map(game => {
                    return (

                        <div key={game.id} className="gameCard">
                            <p>{game.game_name}</p><br />
                            <img src={game.img_url} /> <br />
                            <Button variant="contained" color="primary" onClick={() => history.push(`/edit/${game.id}`)}>Edit</Button>
                        </div>

                    )
                })}
            </div>
            <br />
            <h2>Wish List</h2>

            <ProfileAddWishlist />
            <div className='cardWrap'>
                {usersWish.map(wish => {
                    return (

                        <div key={wish.id} className="gameCard" >
                            <p>{wish.game_name}</p><br />
                            <img src={wish.img_url} /><br />
                            <Button variant="contained" color="primary" onClick={() => deleteGame(wish.id)}>Remove From Wishlist</Button>
                        </div>


                    )
                })}
            </div>
            <br />
            <h2>Collecton</h2>
            <ProfileAddCollection />
            <div className='cardWrap'>
                {usersCollection.map(game => {
                    return (
                        <div key={game.id} className="gameCard" >
                            <p>{game.game_name}</p><br />
                            <img src={game.img_url} /><br />
                            <Button variant="contained" color="primary"onClick={() => history.push(`/edit/${game.id}`)}>Edit Game</Button>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ProfilePage