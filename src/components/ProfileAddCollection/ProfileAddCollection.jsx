import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Button, TextField} from '@material-ui/core'
function ProfileAddCollection() {
    const store = useSelector(store => store)
    const dispatch = useDispatch();
    const [form, setForm] = useState(true)
    const toggleForm = () => {
        setForm(current => !current)
        setNewGame({
            user_id: store.user.id,
            game_name: "",
            img_url: "",
            details:""
            })
    }
    const [newGame, setNewGame] = useState({
        user_id: store.user.id,
        game_name: "",
        img_url: "",
        details:""
    })
    const addGame = () => {
        console.log(newGame)
        if(!newGame.game_name || !newGame.img_url ){
            alert("please fill out all inputs");
            return;
        }
        dispatch({type:'ADD_GAME', payload:newGame})
        setNewGame({
        user_id: store.user.id,
        game_name: "",
        img_url: "",
        details: ""
        })
      
    }
    return (form ?
        <>

            <Button variant="contained" color="primary" onClick={toggleForm}>Add To Collection</Button>
        </>
        :
        <>
            <form onSubmit={addGame}>
                <TextField value={newGame.game_name} onChange={(e) => setNewGame ({ ...newGame, game_name: e.target.value})} placeholder='Title' />
                <TextField value={newGame.img_url} onChange={(e) => setNewGame ({ ...newGame, img_url: e.target.value})} type="url" placeholder='Image Url' />
                <TextField value={newGame.description} onChange={(e) => setNewGame ({ ...newGame, details: e.target.value})}  placeholder='Details' />
                <Button variant="contained" color="primary"type='submit'>Submit</Button>
            </form>
            <Button variant="contained" color="default" onClick={toggleForm}>Cancel</Button>
            
        </>
    )
}


export default ProfileAddCollection