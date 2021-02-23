import {useState} from 'react'

function ProfileAddCollection() {
    const [ form, setForm ] = useState(true)
    const toggleForm = () => {
        setForm(current => !current)
        console.log(form)
    }
    return ( form?
        <>

            <button onClick={toggleForm}>Toggle</button>
            </>
            :
            <>
            <input placeholder='Title' />
            <input placeholder='Image Url' />
            <select>
                <option>No</option>
                <option>Yes</option>
            </select>
            <button onClick={toggleForm}>Go Back</button>
        </>
    )
}


export default ProfileAddCollection