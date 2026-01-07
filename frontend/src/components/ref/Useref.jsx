import React, { useRef, useState } from 'react'

const Useref = () => {
// const [count,setCount]=useState(0)
const countRef=useRef(0)
console.log("re rendering")
console.log(countRef)

    const handleClick=()=>{
        countRef.current=countRef.current+1
    } 
  return (
    <div>
    <p>{countRef.current}</p>
    <button onClick={handleClick}>click me</button>
    </div>
  )
}

export default Useref