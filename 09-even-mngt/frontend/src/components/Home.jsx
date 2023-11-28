import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './Form';
import { Link } from 'react-router-dom';

export default function Home() {
  //set State
  const [state, setState] = useState({
    data: [],
    id: '',
    type: '',
    sortByLocation: '',
    searchByLocation: '',
    filterByDate: '',
    title: '',
    description: '',
    date: '',
    location: '',
    attendees: [],
  });

  //write on change function
  function handleChange(e) {
    const { name, value } = e.target;
    setState((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchData();
    resetData();
  }

  async function handleDelete(id) {
    try {
      const res = await axios.delete(`http://localhost:5000/${id}`);
      alert(res.data.message);
      setState((p) => ({
        ...p,
        data: state.data.filter((d) => d._id != id),
      }));
    } catch (error) {
      alert(error.message);
    }
  }

  function handleEdit(d) {
    setState((p) => ({
      ...p,
      title: d.title,
      description: d.description,
      date: d.date,
      location: d.location,
      attendees: d.attendees,
      type: 'edit',
      id: d._id,
    }));
  }

  function resetData() {
    setState((p) => ({
      ...p,
      id: '',
      type: '',
      sortByLocation: '',
      searchByLocation: '',
      filterByDate: '',
      title: '',
      description: '',
      date: '',
      location: '',
      attendees: [],
    }));
  }

  //write API calls here
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get('http://localhost:5000', { params: state });
      if (res.data.eventData.length === 0) {
        alert('No data found for given parameter');
        resetData();
        return;
      }
      setState((p) => ({
        ...p,
        data: res.data.eventData,
      }));
    } catch (error) {
      alert(error.message);
    }
  }

  function formatDate(date) {
    let d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  function handleView(d) {
    setState((p) => ({
      ...p,
      title: d.title,
      description: d.description,
      date: d.date,
      location: d.location,
      attendees: d.attendees,
      type: 'view',
    }));
  }

  function handleAttendeeChange(index, name, value) {
    const updatedAttendee = [...state.attendees];
    updatedAttendee[index][name] = value;
    setState((p) => ({ ...p, attendees: updatedAttendee }));
  }

  function handleAddAttendee() {
    setState((p) => ({
      ...p,
      attendees: [...state.attendees, { name: '', feedback: '' }],
    }));
  }

  async function handleSubmitEdit(e) {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:5000/${state.id}`, state);
      alert(res.data.message);
      resetData();
      fetchData();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <>
      {!state.type && (
        <>
          <h2>Home</h2>
          <button type='button'>
            <Link to='/form'>Add New </Link>
          </button>
          {'          '}
          <button type='button'>
            <Link to='/stats'>Stats</Link>
          </button>
          <h2>Sort and Filter</h2>
          <form>
            <div>
              <label>
                <b>Sort by Location: </b>
              </label>

              <label>
                <input
                  type='radio'
                  name='sortByLocation'
                  value='asc'
                  onChange={handleChange}
                  checked={state.sortByLocation === 'asc'}></input>
                Asc
              </label>
              <label>
                <input
                  type='radio'
                  name='sortByLocation'
                  value='desc'
                  onChange={handleChange}
                  checked={state.sortByLocation === 'desc'}></input>
                Desc
              </label>
            </div>

            <div>
              <label>
                <b>Search By location: </b>
              </label>
              <input
                type='text'
                name='searchByLocation'
                onChange={handleChange}
                value={state.searchByLocation}></input>
            </div>

            <div>
              <label>
                <b>Filter by date: </b>
              </label>
              <input
                type='date'
                name='filterByDate'
                onChange={handleChange}
                value={state.filterByDate}></input>
            </div>
            <br></br>
            <div>
              <button
                type='button'
                onClick={handleSubmit}>
                Submit
              </button>{' '}
              <button type='reset'>Reset</button>
            </div>
          </form>
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>description</th>
                <th>date</th>
                <th>location</th>
                <th>Buttons</th>
              </tr>
            </thead>
            <tbody>
              {
                /* Additional functionality - figure out a way to show total attendees at an event */
                state.data.map((d, i) => {
                  return (
                    <tr>
                      <td>{d.title}</td>
                      <td>{d.description}</td>
                      <td>{formatDate(d.date)}</td>
                      <td>{d.location}</td>
                      <td>
                        <button
                          type='button'
                          onClick={() => handleEdit(d)}>
                          Edit
                        </button>
                        <button
                          type='button'
                          onClick={() => handleView(d)}>
                          View more
                        </button>
                        <button
                          type='button'
                          onClick={() => handleDelete(d._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </>
      )}
      {state.type && (
        <Form
          title={state.title}
          description={state.description}
          date={state.date}
          location={state.location}
          attendees={state.attendees}
          handleSubmitEdit={handleSubmitEdit}
          handleAttendeeChange={handleAttendeeChange}
          handleAddAttendee={handleAddAttendee}
          type={state.type}></Form>
      )}
    </>
  );
}
