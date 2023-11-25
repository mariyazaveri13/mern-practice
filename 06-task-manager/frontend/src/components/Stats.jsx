import { React, useEffect, useState } from 'react';
import axios from 'axios';

export default function Stats() {
    const [state, setState] = useState({
        noOfCompletedTasks: '',
        dueTasks: '',
        totalNoOfTasks: ''
    });
    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            const data = await axios.get('http://localhost:5000/stats');
            console.log(data.data[0]);
            setState(preState => ({
                ...preState,
                dueTasks: data.data[0].dueTasks,
                noOfCompletedTasks: data.data[0].noOfCompletedTasks,
                totalNoOfTasks: data.data[0].totalNoOfTasks

            }))
        } catch (error) {

        }
    }
    return (
        <>
            <h1>Stats</h1>
            <div>Number of tasks : {state.totalNoOfTasks}</div>
            <div>Completed tasks : {state.noOfCompletedTasks}</div>
            <div>Tasks due in the next 7 days : {state.dueTasks}</div>
        </>
    );
}