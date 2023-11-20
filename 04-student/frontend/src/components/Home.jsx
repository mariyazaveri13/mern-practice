import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [state, setState] = useState({
    data: [],
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

  return (
    <>
      <button type="button">
        <Link to="/form">Add Student</Link>
      </button>
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
                <tr>
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
