import { React, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
export default function AddTask(props) {
    const [state, setState] = useState({
        title: "",
        description: "",
        expectedHours: "",
        due_date: "",
        status: ""
    });

    const validateNumber = (num) => {
        return /^[0-9]\d*$/.test(num);
    }
    const validateTitle = (str) => {
        return /^[a-zA-Z ]*$/.test(str);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateNumber(state.expectedHours) && validateTitle(state.title)) {
            submitData();
            setState(preState => ({
                ...preState,
                title: "",
                description: "",
                due_date: "",
                status: "",
                expectedHours: ""
            }));
        }
        else {
            alert("Validation Failed");
        }
    }
    const handleChange = (e) => {
        const { name, type, value, checked } = e.target;
        if (name === "status") {
            setState(preState => ({
                ...preState,
                [name]: checked
            }));
            return;
        }
        setState(preState => ({
            ...preState,
            [name]: type === 'number' ? Number(value) : value
        }));
    }
    async function submitData() {
        try {
            const res = await axios.post("http://localhost:5000/tasks",
                state, { mode: "no-cors" }
            );
            alert(res.data.message);
        } catch (error) {
            alert(error.message);
        }
    }
    function getDate(date) {
        const d = new Date(date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
            2,
            '0'
        )}-${String(d.getDate()).padStart(2, '0')}`;
    }
    return (
        <>
            <h2>Add Task Form</h2>
            <form >
                <div><input type="text" name="title" placeholder="Please Enter Title"

                    value={props.isEdited ? props.title : state.title}
                    onChange={props.isEdited ? props.handleChange : handleChange} /></div>
                <div><input type="text" name="description" placeholder="Please Enter description"
                    value={props.isEdited ? props.description : state.description}
                    onChange={props.isEdited ? props.handleChange : handleChange} /></div>
                <div><input type="number" name="expectedHours" placeholder="Please Enter expectedHours"
                    value={props.isEdited ? props.expectedHours : state.expectedHours} onChange={props.isEdited ? props.handleChange : handleChange} /></div>

                <div>Due Date <input type="date" name="due_date" value={props.isEdited ? getDate(props.due_date) : state.due_date} onChange={props.isEdited ? props.handleChange : handleChange} /></div>

                <div>Completed Status<input type="checkbox" name="status" checked={props.isEdited ? props.status : state.status} onChange={props.isEdited ? props.handleChange : handleChange} /></div>
                <button type="submit" onClick={props.isEdited ? props.handlesubmit : handleSubmit}>Submit</button>
                <button type="button">
                    <Link to="/">Back</Link>
                </button>
            </form>
        </>
    );
}