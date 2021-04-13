import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { TextField, Button, Paper, Card, CardContent, useMediaQuery } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
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

    const tablet = useMediaQuery("(min-width: 1200px)")
    const phone = useMediaQuery("(min-width: 650px)")

    const tradeable = store.games.filter(games => games.tradeable === true && games.wish_list === false)
    useEffect(() => {
        setNoOfPages(Math.ceil(tradeable.length / itemsPerPage));
    }, [store.games])

    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const [noOfPages, setNoOfPages] = useState(Math.ceil(tradeable.length / itemsPerPage))
    const handleChange = (event, value) => {
        setPage(value);
    }
    const viewProfile = (id) => {
        console.log(id)
        history.push(`/details/${id}`)
    }
    const classes = useStyles()
    return (
        <>
            <h1>Available Games</h1>
            <TextField className='searchBar' label='Search Games' value={search} onChange={(e) => setSearch(e.target.value)} />
            {tradeable.length > 0 ?
                <>
                    <div className='cardWrap'>
                        {tradeable.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(game => {
                            return (
                                <div key={game.id} className={`${tablet ? "gameCard" : phone ? "tabletCard" : "phoneCard"}`} >
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
                        <br/><br/>
                        
                    </div>
                    <div className="pageWrap">
                        <Pagination
                            style = {{margin:"auto"}}
                            className="pagination"
                            count={noOfPages}
                            shape="rounded"
                            variant="outlined"
                            onChange={handleChange}
                            defaultPage={1}
                            showFirstButton
                            showLastButton />
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