import './App.css';
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './Pages/Home';
import Account from './Pages/Account';
import ErrorPage from './Pages/ErrorPage';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import FindPartner from './Pages/FindPartner';
import Navigation from './Components/Navigation';
import httpClient from './httpClient';
import Alerts from './Components/Alerts';

export const AlertBodyContext = React.createContext()
export const AlertTypeContext = React.createContext()
export const LoggedUserContext = React.createContext()

function App() {

  const [user, setUser] = useState(null);
  const [alertBody, setAlert] = useState("");
  const [alertType, setAlertType] = useState("");


  useEffect(()=>{
    console.log(alertBody)

    if(alertType === "error"){
      document.querySelector(".error").classList.remove("hidden")
      document.querySelector(".error").classList.add("flex")
      
      document.querySelector(".success").classList.remove("flex")
      document.querySelector(".success").classList.add("hidden")
    }else if(alertType === "success"){
      document.querySelector(".success").classList.remove("hidden")
      document.querySelector(".success").classList.add("flex")

      document.querySelector(".error").classList.remove("flex")
      document.querySelector(".error").classList.add("hidden")

    }

    if(user === null)
      httpClient.get('/@me').then(resp => setUser(resp.data)).catch(e => console.log("user not authenticated") )

  },[alertType, alertBody])


  

  return (


  <Router>
    <LoggedUserContext.Provider value={user}>

    <div className='h-screen bg-secondary'> 

        <Navigation/>
        <Alerts alertBody={alertBody}/>

      <AlertBodyContext.Provider value={setAlert}>
      <AlertTypeContext.Provider value={setAlertType}>

        <Routes>
          <Route path="/" element={<Home user={user}/>}/>
          <Route path="/account" element={<Account user={user}/>}/>
          <Route path="/signup" element={<SignUp user={user}/>}/>
          <Route path="/login" element={<Login user={user}/>}/>
          <Route path="/find_partner" element={<FindPartner user={user}/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>

      </AlertTypeContext.Provider>
      </AlertBodyContext.Provider>

    </div>

    </LoggedUserContext.Provider>
  </Router>
  );
}

export default App;
