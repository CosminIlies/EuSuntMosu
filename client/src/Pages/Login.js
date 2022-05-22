import React, { useState, useContext } from 'react'
import httpClient from '../httpClient';
import { AlertBodyContext, AlertTypeContext,LoggedUserContext } from '../App';


function Login() {

    
    
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const setAlertBody = useContext(AlertBodyContext)
    const setAlertType = useContext(AlertTypeContext)
    const user = useContext(LoggedUserContext)
    
    if(user != null)
        window.location.href = '/'
    
    const sendDataToServer = ()=>{
        const new_data = {
            email : email,
            password : password
        };
        httpClient.post('/login', new_data)
        .then(resp =>{
            if(typeof(resp.data.error) === "string"){
                console.log(resp.data.error)
                setAlertBody(resp.data.error)
                setAlertType("error")
            }else if(resp.status === 200){
                window.location.href = "/"
                setAlertBody("Logged in successfuly")
                setAlertType("success")
            }
            
        }).catch(e =>{
            console.log("[ERROR]: " + e)
        })
        setAlertBody("")
        setAlertType("")
    }
   



    return (
        <div className='bg-secondary min-h-screen h-fit w-full p-5 pt-24 flex'>
          
            <div className="max-w-screen text-center m-auto">
                <h1 className='text-2xl font-bold mb-4'>Login:</h1>
                <label htmlFor="email"><strong>Email:</strong> </label><br/><input type="email" name="email" onChange={(e) => {setEmail(e.target.value)} }/><br/>
                <label htmlFor="password"><strong>Password:</strong> </label><br/><input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}}/>
                <p className='p-4'>You don't have an account? Click <a className='link' href="/signup">here</a> to make a new account. </p>
                <button className='button-green'  onClick={() => sendDataToServer()}>Login</button>


            </div>
        </div>
    )
}

export default Login
