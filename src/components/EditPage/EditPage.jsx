import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core'

function EditPage() {

    const store = useSelector(store => store)
    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    //Used to edit the tradeable status the value of 'boolean' is hardcoded 
    //true or false into the buttons that run this function.
    const editTradeable = (boolean) => {
        dispatch({ type: 'EDIT_TRADEABLE', payload: { id: params.id, boolean } })
    }
    //Deletes selected game from database, and redirects user back to profile page
    const deleteGame = () => {
        dispatch({ type: 'DELETE_GAME', payload: params.id })
        history.push('/profile')
    }
    //Runs a dispatch to to get the info from the selected game from the value of the params(the games id)
    //Gets ran every time the page loads, or the editTradeable function is run.
    useEffect(() => {
        dispatch({ type: 'EDIT_GAME', payload: params.id });
    }, []);


    return (store.userGames.length === 0 ? 
        <>
            <h1>404</h1>
            <p>Game Not Found</p>
        </>
        :
        <>
            {store.userGames[0].user_id != store.user.id ?
                <>
                    <h1>404</h1>
                    <p>Game Not Found</p>
                </>
                :
                <>
                    <p>Edit Game Page</p>
                    <h2>{store.userGames[0].game_name}</h2>
                    <img src={store.userGames[0].img_url} />

                    {store.userGames[0].tradeable === true ?
                        <>
                            <p> Tradeable: Yes </p>
                            <Button variant="contained" color="primary" onClick={() => editTradeable(false)}>Remove From Tradeable</Button>
                        </>
                        :
                        <>
                            <p> Tradeable: No </p>
                            <Button variant="contained" color="primary" onClick={() => editTradeable(true)}>Mark as Tradeable</Button>
                        </>
                    }
                    <br/><br/>
                    <Button variant="contained" color="default" onClick={deleteGame}>Remove From Collection</Button>
                </>}
        </>
    )
}

export default EditPage