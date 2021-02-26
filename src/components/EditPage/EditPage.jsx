import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function EditPage() {
    const store = useSelector(store => store)
    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: 'EDIT_GAME', payload: params.id });
    }, []);

    return( store.userGames.length === 0 ?
        <> 
        </>
        :
        <>
        {console.log('params is',params)}
        <p>Edit Game Page</p>
        <h2>{store.userGames[0].game_name}</h2>
        <img src={store.userGames[0].img_url}/>
        </>
    )
}

export default EditPage