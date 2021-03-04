import ProfileAddCollection from '../ProfileAddCollection/ProfileAddCollection'
import ProfileAddWishlist from '../ProfileAddWishlist/ProfileAddWishlist'
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { TextField, Button, Paper, Card, CardContent } from '@material-ui/core'
import { useStyles } from '../GameCardStyle/GameCardStyle'
function ProfilePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    useEffect(() => {
        dispatch({ type: 'GET_GAMES', payload: "" });
    }, [dispatch]);


    const usersGames = store.games.filter(games => games.user_id === store.user.id)
    const usersCollection = usersGames.filter(games => games.wish_list === false)
    const usersTradeable = usersGames.filter(games => games.tradeable === true)
    const usersWish = usersGames.filter(games => games.wish_list === true)

    const classes = useStyles()
    const deleteGame = (id) => {
        console.log(id)
        dispatch({ type: 'DELETE_GAME', payload: id })
    }
    return (
        <>
            <h1>Your Profile</h1>
            <h4>Username: {store.user.username}</h4>
            <h4>Contant Email: {store.user.email} </h4>
            <br/>
            <h2>Tradeable Games</h2>
            <div className='cardWrap'>
                {usersTradeable.map(game => {
                    return (

                        <div key={game.id} className="gameCard">
                            <Paper className={classes.paper} elevation={20}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <p><strong>{game.game_name}</strong></p><br />
                                        <img src={game.img_url} /> <br />
                                        <Button className={classes.button} variant="contained" color="primary" onClick={() => history.push(`/edit/${game.id}`)}>Edit</Button>
                                    </CardContent>
                                </Card>
                            </Paper>
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
                            <Paper className={classes.paper} elevation={20}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <p><strong>{wish.game_name}</strong></p><br />
                                        <img src={wish.img_url} /><br />
                                        <Button className={classes.button} variant="contained" color="primary" onClick={() => deleteGame(wish.id)}>Remove From Wishlist</Button>
                                    </CardContent>
                                </Card>
                            </Paper>
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
                            <Paper className={classes.paper} elevation={20}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <p><strong>{game.game_name}</strong></p><br />
                                        <img src={game.img_url} /><br />
                                        <Button className={classes.button} variant="contained" color="primary" onClick={() => history.push(`/edit/${game.id}`)}>Edit Game</Button>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default ProfilePage