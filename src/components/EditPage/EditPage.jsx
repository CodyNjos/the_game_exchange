import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';

function EditPage() {
    const store = useSelector(store => store)
    const params = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: 'EDIT_GAME', payload: params.id });
    }, []);

    const editTradeable = (boolean) => {
        dispatch({ type: 'EDIT_TRADEABLE', payload: { id: params.id, boolean } })
        dispatch({ type: 'EDIT_GAME', payload: params.id });
    }
    const deleteGame = () => {
        dispatch ({type: 'DELETE_GAME', payload: params.id})
        history.push('/profile')
    }
    return (store.userGames.length === 0 ?
        <>
        <h1>404</h1>
        <p>Game Not Found</p>
        </>
        :
        <>
            {console.log('params is', params)}
            <p>Edit Game Page</p>

            <h2>{store.userGames[0].game_name}</h2>
            <img src={store.userGames[0].img_url} />

            {store.userGames[0].tradeable === true ?
                <>
                    <p> Tradeable: Yes </p>
                    <button onClick={() => editTradeable(false)}>Remove From Tradeable</button>
                </>
                :
                <>
                    <p> Tradeable: No </p>
                    <button onClick={() => editTradeable(true)}>Mark as Tradeable</button>
                </>
            }<br/>
            <button onClick = {deleteGame}>Remove From Collection</button>
        </>
    )
}

export default EditPage