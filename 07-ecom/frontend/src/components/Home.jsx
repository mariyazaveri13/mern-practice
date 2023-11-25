import { useEffect, useState } from "react"
import axios from 'axios'
import Form from "./Form"
import { Link } from "react-router-dom"

export default function Home(){

    //set State
    const [state,setState] = useState({})

    //write on change function
    function handleChange(){

    }

    function handleSubmit(){

    }

    function handleDelete(){
        
    }

    function handleEdit(){

    }

    function resetData(){
        
    }

    //write API calls here
    useEffect(()=>{

    },[])

    return (
    <>
        <h2>Home</h2>
        <button type="button">
            <Link to='/form'>Add New </Link>
        </button>
        {"          "}
        <button type="button">
            <Link to='/stats'>Stats</Link>
        </button>
        <h2>Sort and Filter</h2>
        <form>
            <div>
                <label>
                    <b>Sort by Title: </b>
                </label>

                <label>
                    <input
                        type="radio"
                        name=""
                        value='asc'
                    ></input>
                    Asc
                </label>
                <label>
                    <input
                        type="radio"
                        name=""
                        value='desc'
                    ></input>
                    Desc
                </label>

            </div>

            <div>
                <label>
                    <b>Search By Title: </b>
                </label>
                <input
                    type="text"
                    name=""
                ></input>
            </div>


            <div>
                <label>
                    <b>Filter by Task: </b>
                </label>
                <select name='filter' >
                    <option disabled value={''}> Please Select Option</option>
                    <option value=""></option>
                    <option value=""> </option>
                </select>
            </div>
            <br></br>
            <div>
                <button type='button' >Submit</button>{' '}
                <button type="reset" >
                    Reset
                </button>
            </div>
        </form>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Buttons</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <button type="button">Edit</button>
                        <button type="button">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        {<Form></Form>}
    </>
    )
}