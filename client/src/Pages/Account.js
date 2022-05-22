import React,{useState, useEffect, useContext} from 'react'
import httpClient from '../httpClient'
import { LoggedUserContext } from '../App'


function Account() {

    const [username, setUsername] = useState("")
    const [details, setDetails] = useState("")
    const [city, setCity] = useState("")

    const user = useContext(LoggedUserContext)

    useEffect(()=>{
        
        if( user != null){
            console.log( user.city)
            setCity( user.city)
            setUsername( user.name)
            setDetails( user.details)
        }
    },[])

    const sendDataToServer = async ()=>{
        const new_data = {
            username : username,
            details : details,
            city : city

        }



        try{
            const resp = await httpClient.post('/update_account', new_data)
            
            if(resp.status === 200){

                window.location.href = "/"
            }
    
        }catch(e){
            if(e.response.status === 401)
                console.log("")
        }

    }


    return (
        <div className='bg-secondary min-h-screen h-fit p-5 pt-24 flex flex-col justify-center items-center'>
          
            <div className="text-center m-auto">
                <h1 className='text-2xl font-bold mb-4'>Change Account Details:</h1>

                <label htmlFor="username"><strong>Name:</strong></label><br/>
                <input type="text" defaultValue={username} name="username" onChange={(e) => {setUsername(e.target.value)}}/> <br/>

                <label htmlFor="details"><strong>Details:</strong></label><br/>
                <textarea name="details" defaultValue={details} cols="30" rows="10" onChange={(e) => {setDetails(e.target.value)}}/> <br/>

                <label htmlFor="city"><strong>City:</strong></label>
                <select name="city" value={city} defaultValue={city}  onChange={(e)=>{setCity(e.target.value)}} >
                    <option value="Bucharest">Bucharest</option>
                    <option value="Alt oras">Alt oras</option>
                </select>

                
                
                <p className='p-4'>You already have an account? Click <a href="/login">here</a> to login. </p>
                <button className='button-green' onClick={() => sendDataToServer()}>Save</button>
            </div>
        </div>
    )
}

export default Account
