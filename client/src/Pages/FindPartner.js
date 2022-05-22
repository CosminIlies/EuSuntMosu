import React, {useEffect, useState, useContext} from 'react'
import httpClient from '../httpClient'
import { LoggedUserContext } from '../App'
import MeetingPlace from '../Components/MeetingPlace';



function FindPartner() {

    const [partner, setPartner] = useState(null)

    const user = useContext(LoggedUserContext)


    useEffect(()=>{
        if( user !== null && partner === null &&  user.partner_id !== 0){
            httpClient.get(`/@user/${ user.partner_id}`).then(resp=> setPartner(resp.data))
        }
        


    })


    return (
        <div className='bg-secondary min-h-screen h-fit p-5 pt-24 flex justify-center overflow-x-hidden'>
          
            <div className='max-w-screen text-center m-auto'>
                <h1 className='text-2xl font-bold mb-4 '>Find Partner:</h1>
                {
                 user !== null?(
                
                
                 user.partner_id === 0? (
                     user.is_searching === false?(
                        <>
                            <p className='p-4'>You currently dont have a partner to share a present. Wanna start searching for one?</p>
                            <button className='button-green' onClick={()=> { httpClient.post('/start_finding_partner'); window.location.href = '/'}}>Find Partner</button>
                        </>
                    ):(
                        <>
                            <p className='p-4'>You are searching for a partner. You changed your mind?</p>
                            <button className='button-red' onClick={()=> { httpClient.post('/stop_finding_partner'); window.location.href = '/'}}>Stop Searching</button>
                        </>
                    )
                    

                ) : (
                    <>
                        {partner !== null ? (
                            <>
                                <strong>Partner name: </strong><p className='p-4'>{ String(partner.name) }</p>
                                <strong>About Partner: </strong><br/><p className='p-4 mx-auto overflow-hidden'>{ String(partner.details) }</p>
                                <strong>Partner Gender: </strong><p className='p-4'>{ String(partner.gender) }</p>
                                <strong>Partner Age: </strong><p className='p-4'>{ String(partner.age) }</p>
                                
                                <strong>Meeting Place: </strong><p className='p-4'>{ String(partner.meeting_location) }</p>
                                <MeetingPlace lat={partner.meeting_lat} lng={partner.meeting_lng}/>
                                <strong>Meeting Date: </strong><p className='p-4'>{ String(partner.meeting_date) }</p>
                            </>
                        ):(
                            <p>loading...</p>
                        )}
                    
                        <button className='button-red' onClick={()=> { httpClient.post('/abandon_partner'); window.location.href = '/'}}>Abandon Partner</button>
                    </>
                    
                )):( <p>Loading</p> )}


            </div>
        </div>
    )
}

export default FindPartner
