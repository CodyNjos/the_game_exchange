import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

import './HomePage.css'
function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory()
    const store = useSelector(store => store);
    const [search, setSearch] = useState('')
    useEffect(() => {
        dispatch({ type: 'GET_GAMES', payload: search});
    }, [search]);
    const tradeable = store.games.filter(games => games.tradeable === true && games.wish_list === false)
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
            <h2>Home Page</h2>
            <input placeholder = 'Search Games' value={search} onChange={(e) => setSearch( e.target.value)}/>
            {tradeable.length > 0 ? 
            <>
            <div className='cardWrap'>
                {tradeable.map(game => {
                    return (
                        <div key={game.id} className="gameCard" >
                            {game.game_name} <br />
                            <img src={game.img_url} />
                            <p>Offered By: {game.username}</p>
                            <button onClick={() => viewProfile(game.user_id)}>View Profile</button>
                        </div>

                    )
                })}
            </div>
            </>
            :
            <>
            <h2>No Games Found Matching Search Results</h2>
            </>}
        </>
    )
}

export default HomePage