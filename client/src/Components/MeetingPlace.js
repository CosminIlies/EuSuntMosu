import React from 'react'
import { Map, Marker, GoogleApiWrapper} from 'google-maps-react-17';

function MeetingPlace(props) {
    return (
        <div className='my-8 border-4 border-cyan-900 rounded-lg w-[90vw] md:w-[50vw] m-auto h-[90vw] md:h-[50vh] relative'>                               
            <Map 
                                        
                google = {props.google}
                zoom={15}
                style={{position:"relative", width:"100%", height:"100%"}}
                initialCenter={{
                    lat:props.lat,
                    lng:props.lng
                }}
             >
                <Marker
                position={{lat: props.lat, lng: props.lng}} />

             </Map>
            
        </div>
    )
}

export default GoogleApiWrapper({apiKey:"AIzaSyDzDHX0fFZABP8zCa6VoNRD22jZoPP2qms"})(MeetingPlace)
