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
            boolean: true
        })
    }
    const [newGame, setNewGame] = useState({
        user_id: store.user.id,
        game_name: "",
        img_url: "",
        boolean: true
    })
    const addGame = () => {
        console.log(newGame)
        if (!newGame.game_name || !newGame.img_url) {
            alert("please fill out all inputs");
            return;
        }
        dispatch({ type: 'ADD_WISHLIST', payload: newGame })
        dispatch({ type: 'GET_GAMES' })
        setNewGame({
            user_id: store.user.id,
            game_name: "",
            img_url: "",
            boolean: true
        })
    }
    return (form ?
        <>

            <Button id='addWishlistButton' variant="contained" color="primary" onClick={toggleForm}>Add To Wishlist</Button>
        </>
        :
        <>
            <form onSubmit={addGame}>
                <TextField id ='addWishlistInput' className="addInput" value={newGame.game_name} onChange={(e) => setNewGame({ ...newGame, game_name: e.target.value })} placeholder='Title' /><br /><br />
                <TextField id='addWishlistImage' className="addInput" value={newGame.img_url} onChange={(e) => setNewGame({ ...newGame, img_url: e.target.value })} type="url" placeholder='Image Url' /><br />
                <div className="buttonWrap">
                    <Button variant="contained" color="default" type='button' onClick={toggleForm}>Cancel</Button>
                &nbsp;&nbsp;&nbsp;
                <Button id="wishlistSubmit" variant="contained" color="primary" type='submit'>Submit</Button>
                </div>
            </form>


        </>
    )
}


export default ProfileAddCollection