import {useSelector, useDispatch} from "react-redux"
import {useEffect} from 'react'
function HomePage() {
    const dispatch = useDispatch();
    const store = useSelector(store => store);
    useEffect(() => {
        dispatch({ type: 'GET_GAMES' })
    }, []);
    return(
        <>
        <p>Home Page</p>
       
        </>
    )
}

export default HomePage