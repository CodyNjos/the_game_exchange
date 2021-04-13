import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { TextField, Button, Paper, Card, CardContent, useMediaQuery } from '@material-ui/core'
import { useStyles } from '../GameCardStyle/GameCardStyle'

function ProfileOther() {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    const params = useParams()
    const history = useHistory()
    useEffect(() => {
        console.log('params are', params)
        dispatch({ type: "GET_USER_GAMES", payload: params.id })
    }, []);
    const usersTradeable = store.userGames.filter(games => games.tradeable === true)
    const usersWish = store.userGames.filter(games => games.wish_list === true)
    const classes = useStyles()
    const tablet = useMediaQuery("(min-width: 1200px)")
    const phone = useMediaQuery("(min-width: 650px)")
    const viewProfile = (id) => {
        console.log(id)
        history.push(`/details/${id}`)
    }
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
            <div className="cardWrap">
                {usersTradeable.map(game => {
                    return (
                        <div key={game.id} className={`${tablet ? "gameCard" : phone ? "tabletCard" : "phoneCard"}`} >
                            <Paper className={classes.paper} elevation={20}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <p><strong>{game.game_name}</strong></p><br />
                                        <img src={game.img_url} /> <br/>
                                        <Button className={classes.button} variant="contained" color="primary" onClick={() => viewProfile(game.id)}>View Details</Button>
                                    </CardContent>
                                </Card>
                            </Paper>
                        </div>
                    )
                })}
            </div>
            <br />
            <h2>Wish List</h2>
            <div className="cardWrap">
                {usersWish.map(wish => {
                    return (

                        <div key={wish.id} className={`${tablet ? "gameCard" : phone ? "tabletCard" : "phoneCard"}`} >
                            <Paper className={classes.paper} elevation={20}>
                                <Card className={classes.root}>
                                    <CardContent>
                                        <p><strong>{wish.game_name}</strong></p><br />
                                        <img src={wish.img_url} />
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

export default ProfileOther