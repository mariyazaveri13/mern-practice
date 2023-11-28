import { useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"

export default function Stats(){
    //set State
    const [state,setState] = useState({})

    return (
    <>
        <h1>Stats</h1>
        <button type="button">
            <Link to='/form'>Add New </Link>
        </button>
        {"          "}
        <button type="button">
            <Link to='/'>Home</Link>
        </button>

        <div> : {}</div>
            
        <div> : {}</div>
        
        <div> : {}</div>
    </>
    )
}