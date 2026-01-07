import React, { useState, useEffect } from 'react';

const DataEffect=()=>{
    //useEffect hook
    //class
    //ComponentDidMount
    //constructor
    //render
    //getSnapShotFromPropsandstate
    //componentDidUpdate
    //getSnapShotBeforeUpdate
    //componentWillUnMount
    //getDerivedStatefromError
    const [count,setCount]=useState(0)
    
    useEffect(()=>{
        console.log('useeffect render')
    },[])

    return(
        <div>
            <h1>count:{count}</h1>
            <button onClick={()=>setCount(count+1)}>click</button>
        </div>
    )
}

export default DataEffect; 