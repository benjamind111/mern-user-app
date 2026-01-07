import { useState } from "react";

const DynamicButton=(props)=>{
    const [Login,setLogin]=useState(false);
    return(
        <div>
        <h1>User please login here</h1>
        <h3>{Login?`${props.name} you are logged in`:"you are not logged in"}</h3>
        <button onClick={()=>setLogin(!Login)}>{Login ? 'Logout':'Login'}</button>
        </div>
    )
}

export default DynamicButton;