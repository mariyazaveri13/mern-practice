import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './Form';
import { Link } from 'react-router-dom';

export default function Home() {
  //set State
  const [state, setState] = useState({
    data: [],
    sortByDate: '',
    filterByCategory: '',
    searchByAuthor: '',
    id: '',
    isEdited: false,
    title: '',
    content: '',
    author: '',
    publicationDate: '',
    category: '',
  });

  //write on change function
  function handleChange(e) {
    const { checked, type, name, value } = e.target;
    if (name === 'category') {
      if (checked) {
        setState((p) => ({ ...p, category: [...p.category, value] }));
      } else {
        setState((p) => ({
          ...p,
          category: p.category.filter((d) => d != value),
        }));
      }
      return;
    }
    setState((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchData();
  }

  async function handleDelete(id) {
    try {
      const res = await axios.delete(`http://localhost:5000/${id}`);
      alert(res.data.message);
      setState((p) => ({ ...p, data: p.data.filter((d) => d.id != id) }));
    } catch (error) {
      alert(error.message);
    }
  }

  async function handleEditSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.patch(`http://localhost:5000/${state.id}`, state);
      alert(res.data.message);
      resetData();
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  }

  function handleEdit(d) {
    setState((p) => ({
      ...p,
      isEdited: true,
      title: d.title,
      content: d.content,
      author: d.author,
      publicationDate: d.publicationDate,
      category: d.category,
      id: d._id,
    }));
  }

  function resetData() {
    setState((p) => ({
      ...p,
      sortByDate: '',
      filterByCategory: '',
      searchByAuthor: '',
      id: '',
      isEdited: false,
    }));
    fetchData();
  }

  //write API calls here
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get('http://localhost:5000/', { params: state });
      setState((p) => ({ ...p, data: res.data.blogs }));
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  function formatDate(date) {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  return (
    <>
      {!state.isEdited && (
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
                <b>Sort by date: </b>
              </label>

              <label>
                <input
                  type='radio'
                  name='sortByDate'
                  value='asc'
                  checked={state.sortByDate === 'asc'}
                  onChange={handleChange}></input>
                Asc
              </label>
              <label>
                <input
                  type='radio'
                  name='sortByDate'
                  value='desc'
                  checked={state.sortByDate === 'desc'}
                  onChange={handleChange}></input>
                Desc
              </label>
            </div>

            <div>
              <label>
                <b>Search By Author: </b>
              </label>
              <input
                type='text'
                name='searchByAuthor'
                value={state.searchByAuthor}
                onChange={handleChange}></input>
            </div>

            <div>
              <label>
                <b>Filter by Category: </b>
              </label>
              <select
                name='filterByCategory'
                value={state.filterByCategory}
                onChange={handleChange}>
                <option
                  disabled
                  value={''}>
                  {' '}
                  Please Select Option
                </option>
                <option value='Fiction'>Fiction</option>
                <option value='NonFiction'> Non Fiction</option>
                <option value='Other'> Other</option>
              </select>
            </div>
            <br></br>
            <div>
              <button
                type='button'
                onClick={handleSubmit}>
                Submit
              </button>{' '}
              <button
                type='reset'
                onClick={resetData}>
                Reset
              </button>
            </div>
          </form>
          <table>
            <thead>
              <tr>
                <th>title</th>
                <th>content</th>
                <th>author</th>
                <th>publication date</th>
                <th>category</th>
                <th>Buttons</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((d, i) => {
                return (
                  <tr key={d._id}>
                    <td>{d.title}</td>
                    <td>{d.content}</td>
                    <td>{d.author}</td>
                    <td>{formatDate(d.publicationDate)}</td>
                    <td>{d.category.toString()}</td>
                    <td>
                      <button
                        type='button'
                        onClick={() => handleEdit(d)}>
                        Edit
                      </button>
                      <button
                        type='button'
                        onClick={() => handleDelete(d._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      {state.isEdited && (
        <Form
          title={state.title}
          content={state.content}
          author={state.author}
          publicationDate={state.publicationDate}
          category={state.category}
          isEdited={state.isEdited}
          handleChange={handleChange}
          handleEditSubmit={handleEditSubmit}></Form>
      )}
    </>
  );
}
