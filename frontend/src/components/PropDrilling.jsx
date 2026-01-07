import { createContext, useContext, useState } from "react"

const UserContext=createContext()

const PropDrilling1=()=>{
    const[user,setUser]=useState('Ravi')
    return(
        <div>
            <UserContext.Provider value={user}>
            <h1>Prop Drilling-1 {user} </h1>
            <PropDrilling2 user={user} />
            </UserContext.Provider>
        </div>
    )
}

const PropDrilling2=()=>{
    return(
        <div>
            <h1>Prop Drilling-2</h1>
            <PropDrilling3  />
        </div>
    )
}

const PropDrilling3=()=>{
    return(
        <div>
            <h1>Prop Drilling-3</h1>
            <PropDrilling4  />
        </div>
    )
}

const PropDrilling4=()=>{
    return(
        <div>
            <h1>Prop Drilling-4</h1>
            <PropDrilling5  />
        </div>
    )
}

const PropDrilling5=()=>{
    const user=useContext(UserContext)
    return(
        <div>
            <h1>Prop Drilling-5 {user} </h1>
        </div>
    )
}

export default PropDrilling1;