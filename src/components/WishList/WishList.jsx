import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { TextField, Button } from '@material-ui/core'
function WishList() {
    const dispatch = useDispatch();
    const history = useHistory()
    const store = useSelector(store => store);
    const [search, setSearch] = useState('')
    useEffect(() => {
        dispatch({ type: 'GET_GAMES', payload: search });
    }, [search]);
    const wishlist = store.games.filter(games => games.wish_list === true)
    const viewProfile = (user) => {
        console.log(user)
        if (user === store.user.id) {
            console.log('current user')
            history.push('profile')
            return;
        }
        history.push(`/profiles/${user}`)
    }
    return (
        <>
            <p>Wish List Page</p>
            <TextField label= 'Search Wishlist' value={search} onChange={(e) => setSearch( e.target.value)}/>
            {wishlist.length > 0 ?
                <>
                    <div className='cardWrap'>
                        {wishlist.map(games => {
                            return (

                                <div key={games.id} className="gameCard" >
                                    <p>{games.game_name}</p> <br />
                                    <img src={games.img_url} />
                                    <p>{games.username} is looking for this</p>
                                    <Button variant="contained" color="primary" onClick={() => viewProfile(games.user_id)}>View Profile</Button>
                                </div>

                            )
                        })}
                    </div>
                </>
                :
                <h2>No WishList Games Found Matching Search Results</h2>
                }
        </>
    )
}

export default WishList