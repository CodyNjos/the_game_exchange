import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { TextField, Button, Paper, Card, CardContent } from '@material-ui/core'
import { useStyles } from '../GameCardStyle/GameCardStyle'
import { Pagination } from '@material-ui/lab'
function WishList() {
    const dispatch = useDispatch();
    const history = useHistory()
    const store = useSelector(store => store);
    const [search, setSearch] = useState('')
    const wishlist = store.games.filter(games => games.wish_list === true)
    useEffect(() => {
        dispatch({ type: 'GET_GAMES', payload: search });
    }, [search]);
    useEffect(() => {
        setNoOfPages(Math.ceil(wishlist.length / itemsPerPage));
    }, [store.games])

    
    const [page, setPage] = useState(1);
    const itemsPerPage = 6;
    const [noOfPages, setNoOfPages] = useState(Math.ceil(wishlist.length / itemsPerPage))
    const handleChange = (event, value) => {
        setPage(value);
    }
   
    const viewProfile = (user) => {
        console.log(user)
        if (user === store.user.id) {
            console.log('current user')
            history.push('profile')
            return;
        }
        history.push(`/profiles/${user}`)
    }
    const classes = useStyles()
    return (
        <>
            <h1>In Demand Games</h1>
            <TextField className='searchBar' label='Search In Demand Games' value={search} onChange={(e) => setSearch(e.target.value)} />
            {wishlist.length > 0 ?
                <>
                    <div className='cardWrap'>
                        {wishlist.slice((page - 1) * itemsPerPage, page * itemsPerPage).map(games => {
                            return (
                                <div key={games.id} className="gameCard" >
                                    <Paper className={classes.paper} elevation={20}>
                                        <Card className={classes.root}>
                                            <CardContent>
                                                <p><strong>{games.game_name}</strong></p> <br />
                                                <img src={games.img_url} />
                                                <p>{games.username} is looking for this</p>
                                                <Button variant="contained" color="primary" onClick={() => viewProfile(games.user_id)}>View Profile</Button>
                                            </CardContent>
                                        </Card>
                                    </Paper>
                                </div>
                            )
                        })}
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
                <h2>No WishList Games Found Matching Search Results</h2>
            }
        </>
    )
}

export default WishList