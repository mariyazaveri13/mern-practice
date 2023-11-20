import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [state, setState] = useState({
    data: [],
    sortByName: '',
    sortByMarks: '',
    sortByDate: '',
    searchByName: '',
    searchByEmail: '',
    filterByGender: '',
    gtDate: '',
    ltDate: '',
    gtMarks: '',
    ltMarks: '',
  });

  useEffect(() => {
    getData();
  }, []);

  function formatDate(date) {
    let d = new Date(date);
    return `${d.getDate()} / ${d.getMonth() + 1} / ${d.getFullYear()}`;
  }

  async function getData() {
    try {
      const data = await axios.get('http://localhost:5000');
      setState((preState) => ({ ...preState, data: data.data.data }));
    } catch (error) {}
  }

  async function deleteHandler(id) {
    try {
      const data = await axios.delete(`http://localhost:5000/${id}`);
      alert(data.data.message);

      setState((preState) => ({
        ...preState,
        data: preState.data.filter((d) => d._id != id),
      }));
    } catch (error) {
      alert(error.message);
    }
  }

  function validateString(str) {
    return /^[a-zA-Z ]*$/.test(str);
  }

  function submitHandler(e) {
    e.preventDefault();
    const {
      sortByName,
      sortByMarks,
      sortByDate,
      searchByName,
      searchByEmail,
      filterByGender,
      gtDate,
      ltDate,
      gtMarks,
      ltMarks,
    } = state;

    if (gtMarks && !validateNumber(gtMarks)) {
      alert('Numbers pls');
      return;
    }
    if (ltMarks && !validateNumber(ltMarks)) {
      alert('Numbers pls');
      return;
    }
    if (searchByName && !validateString(searchByName)) {
      alert('Alpha pls');
      return;
    }

    sendData();
    resetHandler();
  }

  async function sendData() {
    try {
      const data = await axios.get('http://localhost:5000', { params: state });
      if (data.data.count > 0) {
        setState((preState) => ({ ...preState, data: data.data.data }));
      } else {
        alert('No data found');
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function resetHandler() {
    setState((preState) => ({
      ...preState,
      sortByName: '',
      sortByMarks: '',
      sortByDate: '',
      searchByName: '',
      searchByEmail: '',
      filterByGender: '',
      gtDate: '',
      ltDate: '',
      gtMarks: '',
      ltMarks: '',
    }));
  }

  function validateNumber(str) {
    return /^[0-9]\d*$/.test(str);
  }

  function changeHandler(e) {
    const { type, checked, name, value } = e.target;
    setState((preState) => ({
      ...preState,
      [name]: type == 'number' ? Number(value) : value,
    }));
  }

  return (
    <>
      <button type="button">
        <Link to="/form">Add Student</Link>
      </button>
      <form onSubmit={submitHandler}>
        <div>
          <h2>Sort and filter</h2>
        </div>
        <div>
          <label>
            <b>Sort by Name: </b>
          </label>
          <label>
            <input
              type="radio"
              name="sortByName"
              value={'asc'}
              onChange={changeHandler}
              checked={state.sortByName == 'asc'}
            ></input>
            Asc
          </label>

          <label>
            <input
              type="radio"
              name="sortByName"
              value={'desc'}
              onChange={changeHandler}
              checked={state.sortByName == 'desc'}
            ></input>
            Desc
          </label>
        </div>
        <div>
          <label>
            <b>Sort by Marks: </b>
          </label>
          <label>
            <input
              type="radio"
              name="sortByMarks"
              value={'asc'}
              onChange={changeHandler}
              checked={state.sortByMarks == 'asc'}
            ></input>
            Asc
          </label>

          <label>
            <input
              type="radio"
              name="sortByMarks"
              value={'desc'}
              onChange={changeHandler}
              checked={state.sortByMarks == 'desc'}
            ></input>
            Desc
          </label>
        </div>

        <div>
          <label>
            <b>Sort by Date: </b>
          </label>
          <label>
            <input
              type="radio"
              name="sortByDate"
              value={'asc'}
              onChange={changeHandler}
              checked={state.sortByDate == 'asc'}
            ></input>
            Asc
          </label>

          <label>
            <input
              type="radio"
              name="sortByDate"
              value={'desc'}
              onChange={changeHandler}
              checked={state.sortByDate == 'desc'}
            ></input>
            Desc
          </label>
        </div>

        <div>
          <label>
            <b>Search By Name: </b>
          </label>
          <input
            type="text"
            name="searchByName"
            onChange={changeHandler}
            value={state.searchByName}
          ></input>
        </div>

        <div>
          <label>
            <b>Search By Email: </b>
          </label>
          <input
            type="text"
            name="searchByEmail"
            onChange={changeHandler}
            value={state.searchByEmail}
          ></input>
        </div>

        <div>
          <label>
            <b>Filter By Gender: </b>
          </label>
          <label>
            <input
              type="radio"
              name="filterByGender"
              value={'Male'}
              onChange={changeHandler}
              checked={state.filterByGender == 'Male'}
            ></input>
            Male
          </label>

          <label>
            <input
              type="radio"
              name="sortByDate"
              value={'Female'}
              onChange={changeHandler}
              checked={state.filterByGender == 'Female'}
            ></input>
            Female
          </label>
        </div>

        <div>
          <label>
            <b>Greater than date: </b>
          </label>
          <input
            type="date"
            name="gtDate"
            onChange={changeHandler}
            value={state.gtDate}
          ></input>
        </div>

        <div>
          <label>
            <b>Less than date: </b>
          </label>
          <input
            type="date"
            name="ltDate"
            onChange={changeHandler}
            value={state.ltDate}
          ></input>
        </div>

        <div>
          <label>
            <b>Greater than Marks: </b>
          </label>
          <input
            type="number"
            name="gtMarks"
            onChange={changeHandler}
            value={state.gtMarks}
          ></input>
        </div>

        <div>
          <label>
            <b>Less than Marks: </b>
          </label>
          <input
            type="number"
            name="ltMarks"
            onChange={changeHandler}
            value={state.ltMarks}
          ></input>
        </div>

        <br></br>
        <div>
          <button>Submit</button>{' '}
          <button type="reset" onClick={resetHandler}>
            Reset
          </button>
        </div>
      </form>
      <h1>Home</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Marks</th>
            <th>Gender</th>
            <th>Languages</th>
            <th>Hobbies</th>
            <th>Created Date</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          {state.data.length > 0 ? (
            state.data.map((d) => {
              return (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>{d.totalMarks}</td>
                  <td>{d.gender}</td>
                  <td>{d.languages.toString()}</td>
                  <td>{d.hobbies.toString()}</td>
                  <td>{formatDate(d.createdAt)}</td>
                  <td>
                    {
                      <>
                        <button>Edit</button>{' '}
                        <button
                          type="button"
                          onClick={() => deleteHandler(d._id)}
                        >
                          Delete
                        </button>
                      </>
                    }
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
