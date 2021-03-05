import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core'

function DetailsPage() {

    const store = useSelector(store => store)
    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()


    //Runs a dispatch to to get the info from the selected game from the value of the params(the games id)
    //Gets ran every time the page loads, or the editTradeable function is run.
    useEffect(() => {
        dispatch({ type: 'EDIT_GAME', payload: params.id });
    }, []);

    const viewProfile = (user) => {
        if (user === store.user.id) {
            console.log('current user')
            history.push('/profile')
            return;
        }
        history.push(`/profiles/${user}`)

    }

    return (store.userGames.length === 0 ?
        <>
            <h1>404</h1>
            <p>Game Not Found</p>
        </>
        :
        <>
            <h1>{store.userGames[0].game_name}</h1>
            <h4>Offered by: {store.userGames[0].username}</h4>
            <h4>Contact at: {store.userGames[0].email}</h4>
            <img src={store.userGames[0].img_url} />
            <div className="detailsWrap">
                <div className="details">
                    {store.userGames[0].details ?
                        <>
                            <p className='detailsText'>{store.userGames[0].details}</p>
                        </>
                        :
                        <>
                            <p>{store.userGames[0].username} did not provied details for this game.</p>
                        </>}
                </div>
            </div>
            <Button variant="contained" color="primary" onClick={() => viewProfile(store.userGames[0].user_id)}>View Profile</Button>

        </>
    )
}

export default DetailsPage