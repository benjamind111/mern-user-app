import React, { useState } from 'react'

// virtual DOM-virtual DOM is a in memory copy of a real(actual) DOM
// when value is updated react cannot directly update to actual DOM
//it first updates the virtual DOM then it compares or diff exact copy of virtual DOM
//then it updates the actual DOM

const Counter = () => {
    const[count,setCount]=useState(0)
  return (
    <div>
        <h1>Hello</h1>
        <h1>{count}</h1>
        <button onClick={()=> setCount(count+1)} >click me</button>
    </div>
  )
}

export default Counter