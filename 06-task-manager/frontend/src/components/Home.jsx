import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddTask from './AddTask';

export default function Home() {
    const [state, setState] = useState({
        data: [],
        sortByTitle: '',
        searchBytitle: '',
        filter: '',
        isEdited: false,
        title: "",
        description: "",
        expectedHours: "",
        due_date: "",
        status: "",
        id: ''
    })
    useEffect(() => {
        if (state.data.length === 0) {
            fetchData();
        }
    }, []);

    async function fetchData() {
        try {
            // let query = {};
            // if(state.searchBytitle){
            //     query.searchBytitle=state.searchBytitle
            // }
            const res = await axios.get("http://localhost:5000/tasks", { params: state });
            setState(preState => ({
                ...preState,
                data: res.data.TaskList
            }))
        } catch (error) {
            alert(error.message);
        }
    }

    async function editData(e) {
        e.preventDefault();
        let obj = {
            title: state.title,
            description: state.description,
            expectedHours: state.expectedHours,
            due_date: state.due_date,
            status: state.status,
        };
        try {
            const res = await axios.patch(`http://localhost:5000/tasks/${state.id}`, obj, { mode: 'no-cors' }
            );
            console.log(res.data)
            setState(preState => ({
                ...preState,
                isEdited: false
            }));
            fetchData();
        } catch (error) {
            alert(error.message);
            console.log(error);

        }
    }
    async function onClickeditData(t) {

        setState(preState => ({
            ...preState,
            isEdited: true,
            id: t._id,
            title: t.title,
            description: t.description,
            expectedHours: t.expectedHours,
            due_date: t.due_date,
            status: t.status
        }));
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(preState => ({
            ...preState,
            [name]: value
        }));
    }
    function resetData() {
        setState(preState => ({
            ...preState,
            sortByTitle: '',
            searchBytitle: '',
            filter: '',
            title: "",
            description: "",
            expectedHours: "",
            due_date: "",
            status: "",
            id: ''

        }));
        fetchData();
    }
    async function DeleteData(id) {
        try {
            const res = await axios.delete(`http://localhost:5000/tasks/${id}`);
            setState(preState => ({
                ...preState,
                data: state.data.filter(d => d._id !== id)
            }))
        } catch (error) {
            alert(error.message);
        }
    }
    function getDate(d) {
        const date = new Date(d);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    }
    return (
        <>  <form>
            <div>
                <h2>Sort and filter</h2>
            </div>
            <div>
                <label>
                    <b>Sort by Title: </b>
                </label>

                <label>
                    <input
                        type="radio"
                        name="sortByTitle"
                        value='asc'
                        onChange={handleChange}
                        checked={state.sortByTitle === 'asc'}
                    ></input>
                    Asc
                </label>
                <label>
                    <input
                        type="radio"
                        name="sortByTitle"
                        value='desc'
                        onChange={handleChange}
                        checked={state.sortByTitle === 'desc'}
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
                    name="searchBytitle"
                    value={state.searchBytitle}
                    onChange={handleChange}
                ></input>
            </div>


            <div>
                <label>
                    <b>Filter by Task: </b>
                </label>
                <select name='filter' onChange={handleChange} value={state.filter}>
                    <option disabled value={''}> Please Select Option</option>
                    <option value="CompletedTasks">Filter by Completed Tasks</option>
                    <option value="DueTasks">Filter by Due date in next 7 days </option>
                </select>
            </div>
            <br></br>
            <div>
                <button type='button' onClick={fetchData}>Submit</button>{' '}
                <button type="reset" onClick={resetData}>
                    Reset
                </button>
            </div>
        </form>
            <h2>Home</h2>
            <button type="button">
                <Link to='/task'>Add New Task</Link>
            </button>
            {"          "}
            <button type="button">
                <Link to='/stats'>Stats</Link>
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Due_date</th>
                        <th>ExpectedHours</th>
                        <th>Created_date</th>
                        <th>Buttons</th>
                    </tr>
                </thead>
                <tbody>
                    {state.data.map((t, i) => {
                        return (
                            <tr key={i + 1}>
                                <td>{t.title}</td>
                                <td>{t.description}</td>
                                <td>{t.status ? "finished" : "not finished"}</td>
                                <td>{getDate(t.due_date)}</td>
                                <td>{t.expectedHours}</td>
                                <td>{getDate(t.created_date)}</td>
                                <td>
                                    {
                                        <>
                                            <button type='button' onClick={() => onClickeditData(t)}>
                                                Edit
                                            </button>{' '}
                                            <button
                                                type="button"
                                                onClick={() => DeleteData(t._id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    }
                                </td>
                            </tr>
                        )
                    })}



                </tbody>
            </table>
            {state.isEdited && <AddTask title={state.title}
                description={state.description}
                due_date={state.due_date}
                status={state.status}
                expectedHours={state.expectedHours}
                isEdited={state.isEdited}
                handleChange={handleChange}
                handlesubmit={editData}

            />}

        </>

    );
}