import React, {useEffect} from 'react'

import santa from '../icons/santa.svg'
import snowflake from '../icons/snowflake.svg'
function Home() {


    const createSnowFlake = ()=>{

        const snow_flake = document.createElement('img');
        const layer = Math.random()
        snow_flake.src = snowflake

        snow_flake.classList.add("snowflake")
        snow_flake.style.left = Math.random() * window.innerWidth-25+'px'
        snow_flake.style.animationDuration = layer * 40 + 30 +'s'
        snow_flake.style.opacity = (1 - layer) * 2
        snow_flake.style.width = (1 - layer) * 15 +5 +"px"

        document.querySelector("#container").appendChild(snow_flake)

        

        console.log(document.querySelector("#container"))

        setTimeout(()=>{
            snow_flake.remove()
        },30000)

    }
    useEffect(() => {
        setInterval(createSnowFlake, 1000 )
        
    },[])
    

    return (
        <>
    
        <div id="container"className=' max-w-screen min-h-screen h-fit w-full p-5 pt-24 text-center bg-primary text-secondary' >
            <h1 className='text-2xl font-bold mb-4'>About us</h1>
            <p className='px-10  lg:w-1/3 mx-auto'>
                <img className=' w-96 m-auto py-10' src={santa} alt="" />
                Te ai simtit vreodata singur de sarbatori sau esti la distanta mare de cei dragi? "Eu sunt mosu'" are ca scop, ca printr un simplu cadou dat unei persoane necunoscute, sa diminueze sentimentul de singuratate. Doar fa ti un cont, scrie o mica descriere a ta si lucrurilor care ti plac, si noi o sa cautam o persoana din acelasi oras cu care sa faceti schimb de cadouri. Din moment ce "doar gestul conteaza" cadourile nu trebuie sa fie scumpe:)
                
            </p>

            

        </div>
        </>
    )
}

export default Home
