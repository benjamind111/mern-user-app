import React, { useEffect, useRef } from 'react'

const InputRef = () => {
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div>
      <h1>InputRef</h1>
      <input type="text" ref={inputRef} placeholder='Enter a name ... ' />
    </div>
  )
}

export default InputRef
