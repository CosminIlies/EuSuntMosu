import React from 'react'

function Alerts(props) {


    return (
        <>
            <div className='error fixed top-[71px] left-0 max-w-screen hidden justify-between'>
            <p className='w-full text-center'>{props.alertBody}</p> 
            <button onClick={()=>{ document.querySelector(".error").classList.add("hidden"); document.querySelector(".error").classList.remove("flex");}}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>

            <div className='success fixed top-[71px] max-w-screen hidden justify-between'>
            <p className='w-full text-center'>{props.alertBody}</p> 
            <button onClick={()=>{ document.querySelector(".success").classList.add("hidden");}}>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>
        </>
    )
}

export default Alerts
