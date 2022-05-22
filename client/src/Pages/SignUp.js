import React, {useState, useContext} from 'react'
import httpClient from '../httpClient'
import { AlertBodyContext, AlertTypeContext, LoggedUserContext } from '../App'

function SignUp() {
    
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeat_password, setRepeatPassword] = useState("")
    const [details, setDetails] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("Female")
    const [city, setCity] = useState("Bucharest")
    
    const alertBody = useContext(AlertBodyContext)
    const alertType = useContext(AlertTypeContext)
    const user = useContext(LoggedUserContext)
    
    if(user != null)
        window.location.href = '/'


    const sendDataToServer = ()=>{
        const new_data = {
            email : email,
            username : username,
            password : password,
            repeat_password : repeat_password,
            details : details,
            age : age,
            gender: gender,
            city:city

        }


        httpClient.post('/signup', new_data)
        .then(resp =>{
            

            if(typeof resp.data.error === "string"){
                console.log(resp.data.error)
                alertBody(resp.data.error)
                alertType("error")
            }else if(resp.status === 200){
                window.location.href = "/"
                alertBody("Account was created successfuly")
                alertType("success")
            }
        }).catch(e => {
            if(e.status === 409){
                alertBody("User already exist")
                alertType("error")
            }

            console.log("[ERROR]: " + e)
            
        })
        alertBody("")
        alertType("")

    }


    return (
        <div className='bg-secondary min-h-screen h-fit  w-full p-5 pt-24 flex'>
          
            <div className="text-center max-w-screen m-auto">

                <h1 className='text-2xl font-bold my-4'>Sign Up:</h1>

                <label htmlFor="username"><strong>Name:</strong></label><br/>
                <input type="text" name="username" onChange={(e) => {setUsername(e.target.value)}}/> <br/>


                <label htmlFor="email"><strong>Email: </strong></label> <br/>
                <input type="email" name="email" onChange={(e) => {setEmail(e.target.value)}}/> <br/>


                <label htmlFor="password"><strong>Password: </strong></label> <br/>
                <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}}/> <br/>

                <label htmlFor="repeat_password"><strong>Repeat Password:</strong></label> <br/>
                <input type="password" name="repeat_password" onChange={(e) => {setRepeatPassword(e.target.value)}}/> <br/>

                <label htmlFor="details"><strong>Write a small description about you:</strong></label><br/>
                <textarea name="details" id="" cols="24" rows="10" onChange={(e) => {setDetails(e.target.value)}}/> <br/>

                <label htmlFor="age"><strong>Age:</strong></label> <br/>
                <input type="number" name="age" onChange={(e) => {setAge(e.target.value)}}/><br/>

                <label htmlFor="gender"><strong>Gender:</strong></label> 
                <select name="gender" onChange={(e)=>{setGender(e.target.value)}} >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                </select><br/>

                <label htmlFor="city"><strong>City:</strong></label> 
                <select name="city" onChange={(e)=>{setCity(e.target.value)}} >
                    <option value="Bucharest">Bucharest</option>
                    <option value="Alt oras">Alt oras</option>
                </select>

    
                <p className='p-4'>You already have an account? Click <a className='link' href="/login">here</a> to login. </p>
                <button className='button-green' onClick={() => sendDataToServer()}>SignUp</button>
            </div>
        </div>
    )
}

export default SignUp
