import axios from "axios";
import { useEffect, useState } from "react";

const RandomDogs=()=>{
    const [dogs,setDogs]=useState([])

    const handleDogs=()=>{
        axios.get('https://dog.ceo/api/breeds/image/random')
        .then((data)=>{
            console.log(data.data)
            setDogs(data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    useEffect(()=>{
        // https://dog.ceo/api/breeds/image/random
        handleDogs()
    },[])

    return(
        <div>
            <h1>Random Dogs</h1>
            {
                dogs && <img src={dogs.message} alt='dogs' style={{width:'400px',height:'400px'}} />
            } <br />
            <button onClick={handleDogs}>Click me to change</button>
        </div>
    )
}

export default RandomDogs;