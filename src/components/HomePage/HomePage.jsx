import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { TextField, Button, Paper, Card, CardContent } from '@material-ui/core'
import { useStyles } from '../GameCardStyle/GameCardStyle'
import './HomePage.css'
function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory()
    const store = useSelector(store => store);
    const [search, setSearch] = useState('')
    useEffect(() => {
        dispatch({ type: 'GET_GAMES', payload: search });
    }, [search]);
    const tradeable = store.games.filter(games => games.tradeable === true && games.wish_list === false)
    const viewProfile = (id) => {
        console.log(id)
        history.push(`/details/${id}`)
    }
    const classes = useStyles()
    return (
        <>
            <h1>Available Games</h1>
            <TextField label='Search Games' value={search} onChange={(e) => setSearch(e.target.value)} />
            {tradeable.length > 0 ?
                <>
                    <div className='cardWrap'>
                        {tradeable.map(game => {
                            return (
                                <div key={game.id} className="gameCard" >
                                    <Paper className={classes.paper} elevation={20}>
                                        <Card className={classes.root}>
                                            <CardContent>
                                                <p><strong> {game.game_name}</strong></p>
                                                <img src={game.img_url} />
                                                <p>Offered By: {game.username}</p>
                                                <Button variant="contained" color="primary" onClick={() => viewProfile(game.id)}>View Details</Button>
                                            </CardContent>
                                        </Card>
                                    </Paper>
                                </div>
                            )
                        })}
                    </div>
                </>
                :
                <>
                    <h2>No Tradeable Games Found Matching Search Results</h2>
                </>}
        </>
    )
}

export default HomePage