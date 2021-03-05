import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField } from '@material-ui/core'
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
            details: ""
        })
    }
    const [newGame, setNewGame] = useState({
        user_id: store.user.id,
        game_name: "",
        img_url: "",
        details: ""
    })
    const addGame = () => {
        console.log(newGame)
        if (!newGame.game_name || !newGame.img_url) {
            alert("please fill out all inputs");
            return;
        }
        dispatch({ type: 'ADD_GAME', payload: newGame })
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
                <TextField className="addInput" value={newGame.game_name} onChange={(e) => setNewGame({ ...newGame, game_name: e.target.value })} label='Title' /><br /><br />
                <TextField multiline rowsMax={4} className="addInput" value={newGame.details} onChange={(e) => setNewGame({ ...newGame, details: e.target.value })} label='Details' /><br /> <br />
                <TextField className="addInput" value={newGame.img_url} onChange={(e) => setNewGame({ ...newGame, img_url: e.target.value })} type="url" label='Image Url' /><br />
                <div className="buttonWrap">
                    <Button className="formButton" variant="contained" color="default" type="button" onClick={toggleForm}>Cancel</Button>
                &nbsp;&nbsp;&nbsp;
                <Button className="formButton" variant="contained" color="primary" type='submit'>Submit</Button>
                </div>
            </form>


        </>
    )
}


export default ProfileAddCollection