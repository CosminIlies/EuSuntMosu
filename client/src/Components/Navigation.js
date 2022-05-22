import React, {useContext} from 'react'
import {Link } from 'react-router-dom'
import httpClient from '../httpClient';
import { LoggedUserContext } from '../App';

function Navigation() {
    const user = useContext(LoggedUserContext)


    const toggleMobileMenu = ()=>{
        document.querySelector('.menu-mobile').classList.toggle("hidden");
    }

    return (
        <>
            <nav className="fixed z-10 w-screen bg-primary text-secondary flex px-8 py-4 justify-between items-center">
            
                <Link className='flex items-center w-screen justify-center md:w-6/12 md:justify-start group ' to="/" > 

                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 group-hover:animate-bounce  " viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd" />
                    <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z" />
                </svg>

                <span className="font-bold ml-5">
                    Eu Sunt Mosu'
                </span> 
                </Link>
                


                { user != null ? (
                <>
                    <div className='hidden md:block'>
                    <Link to="/"> Home </Link>&emsp;
                    <Link to="/find_partner"> Find Partner </Link>&emsp;
                    <Link to="/account"> Account </Link>&emsp;
                    <button onClick={ () => { httpClient.post('/logout'); window.location.href = '/' } }>LogOut</button>
                    </div>

                    <div className='block md:hidden'>
                    <button onClick={()=>{document.querySelector('.menu-mobile').classList.toggle("hidden");  }}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    </div>
                </>
                
                
                ):(  
                    <>
                <div className='hidden md:block'>
                    <Link to="/"> Home </Link>&emsp;
                    <Link to="/signup"> Sign Up </Link>&emsp;
                    <Link to="/login"> Login </Link>&emsp;
                    </div>

                <div className='block md:hidden'>
                    <button onClick={() => toggleMobileMenu() }>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    </div>
                </>

                )}
            </nav>

            <div className="menu-mobile hidden bg-mobile_menu py-5 top-[71px] z-10 fixed w-screen shadow-2xl">
                    { user != null ? (
                    <>
                        <Link to="/" onClick={() => toggleMobileMenu() } className="block px-4 py-2 text-sm text-center"> Home </Link>&emsp;
                        <Link to="/find_partner" onClick={() => toggleMobileMenu() }  className="block px-4 py-2 text-sm text-center"> Find Partner </Link>&emsp;
                        <Link to="/account" onClick={() => toggleMobileMenu() }  className="block px-4 py-2 text-sm text-center"> Account </Link>&emsp;
                        <a href='' className="block px-4 py-2 text-sm text-center" onClick={ () => { httpClient.post('/logout'); window.location.href = '/' } }>LogOut</a>
                    </>
                    
                    ):(
                    <>
                        <Link to="/" onClick={() => toggleMobileMenu() } className="block px-4 py-2 text-sm text-center"> Home </Link>&emsp;
                        <Link to="/signup" onClick={() => toggleMobileMenu() }  className="block px-4 py-2 text-sm text-center"> Sign Up </Link>&emsp;
                        <Link to="/login" onClick={() => toggleMobileMenu() }  className="block px-4 py-2 text-sm text-center"> Login </Link>&emsp;
                    </>
                    )
                }
            
            </div>



        </>
    )
}

export default Navigation
