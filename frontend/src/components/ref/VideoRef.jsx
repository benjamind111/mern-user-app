import React, { useRef, useState } from 'react'
import Earth from '../../assets/small.mp4'

const VideoRef = () => {
    const videoPlay=useRef(null)
    const [play,setPlay]=useState(false)
    const handlePlay=()=>{
        setPlay(!play)
        if(!play){
            videoPlay.current.play()
        }else{
            videoPlay.current.pause()
        }
    }
  return (
    <div>
        <h1>Video Ref</h1>
        <video ref={videoPlay} onPlay={()=>setPlay(play)} onPause={()=>setPlay(play)} >
            <source src={Earth} />
        </video>
        <br />
        <button onClick={handlePlay}>{play ? "pause":"play"}</button>
        {/* <button onClick={handlePlay}>pause</button> */}
    </div>
  )
}

export default VideoRef