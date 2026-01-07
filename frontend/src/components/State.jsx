import { useState } from "react";

const StateFunction=()=>{
    const[user,setUser]=useState('Benjamin')
    return(
        <div>
            <h1>this is my name {user}  </h1>
            <button onClick={()=>setUser('Daniel')}>click</button>
        </div>
    )
}

export default StateFunction;