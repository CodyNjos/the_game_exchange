import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
function ProfileAddCollection() {
    const store = useSelector(store => store)
    const dispatch = useDispatch();
    const [form, setForm] = useState(true)
    const toggleForm = () => {
        setForm(current => !current)
        setNewGame({
            user_id: store.user.id,
            game_name: "",
            img_url: ""
            })
    }
    const [newGame, setNewGame] = useState({
        user_id: store.user.id,
        game_name: "",
        img_url: ""
    })
    const addGame = () => {
        console.log(newGame)
        if(!newGame.game_name || !newGame.img_url ){
            alert("please fill out all inputs");
            return;
        }
        dispatch({type:'ADD_GAME', payload:newGame})
        dispatch({ type: 'GET_GAMES' })
        setNewGame({
        user_id: store.user.id,
        game_name: "",
        img_url: ""
        })
      
    }
    return (form ?
        <>

            <button onClick={toggleForm}>Add To Collection</button>
        </>
        :
        <>
            <form onSubmit={addGame}>
                <input value={newGame.game_name} onChange={(e) => setNewGame ({ ...newGame, game_name: e.target.value})} placeholder='Title' />
                <input value={newGame.img_url} onChange={(e) => setNewGame ({ ...newGame, img_url: e.target.value})} type="url" placeholder='Image Url' />
                <button type='submit'>Submit</button>
            </form>
            <button onClick={toggleForm}>Go Back</button>
            
        </>
    )
}


export default ProfileAddCollection