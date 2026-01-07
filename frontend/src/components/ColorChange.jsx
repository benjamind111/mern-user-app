import { useState } from "react";

const RandomColors=()=>{
    const [Color,setColor]=useState('red');
    const box={
        width:'300px',
        height:'300px',
        border:'2px solid white',
        borderRadius:'20px',
        marginTop:'10px',
        marginBottom:'10px',
        backgroundColor:Color

    }
    const handleColorChange=()=>{
        setColor(`#${Math.floor(Math.random() * 0x1000000).toString(16).padStart(6, 0)}`)
    }
    return(
        <div>
            <div style={{width:'100px',height:'100px',border:'2px solid white',borderRadius:'20px'}}></div>
            <div style={box}>
                <h1>{Color}</h1>
            </div>
            <button onClick={handleColorChange}>Colors</button>
        </div>
    )
}

export default RandomColors;