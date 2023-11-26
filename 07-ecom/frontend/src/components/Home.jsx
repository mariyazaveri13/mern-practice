import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './Form';
import { Link } from 'react-router-dom';

export default function Home() {
  //set State

  let url = 'http://localhost:5000';

  const [state, setState] = useState({
    data: [],
    id: '',
    isEdit: false,
    sortByProduct: '',
    searchByCat: '',
    searhByName: '',
    productName: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
  });

  //write on change function
  function handleChange(e) {
    const { name, value } = e.target;
    setState((preState) => ({ ...preState, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchData();
  }

  async function handleDelete(id) {
    try {
      const res = await axios.delete(`${url}/${id}`);
      alert(res.data.message);
      setState((p) => ({
        ...p,
        data: state.data.filter((a) => a._id != id),
      }));
    } catch (error) {
      alert(error.message);
    }
  }

  function handleEdit(d) {
    setState((p) => ({
      ...p,
      id: d._id,
      isEdit: true,
      productName: d.productName,
      description: d.description,
      price: d.price,
      quantity: d.quantity,
      category: d.category,
    }));
  }

  async function handleSubmitEdit() {
    try {
      const res = await axios.patch(`${url}/${state.id}`, state);
      alert(res.data.message);
      resetData();
    } catch (error) {
      alert(error.message);
    }
  }

  function resetData() {
    fetchData();
    setState((p) => ({
      ...p,
      id: '',
      isEdit: false,
      sortByProduct: '',
      searchByCat: '',
      searhByName: '',
      productName: '',
      description: '',
      price: '',
      quantity: '',
      category: '',
    }));
  }

  //write API calls here
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get('http://localhost:5000/', { params: state });
      setState((p) => ({ ...p, data: res.data.productDetails }));
    } catch (error) {
      alert(error.message);
    }
  }

  function formatDate(date) {
    let d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  }

  return (
    <>
      {!state.isEdit && (
        <>
          <h2>Home</h2>
          <button type='button'>
            <Link to='/form'>Add New </Link>
          </button>
          <button type='button'>
            <Link to='/stats'>Stats</Link>
          </button>
          <h2>Sort and Filter</h2>
          <form>
            <div>
              <label>
                <b>Sort by Product name: </b>
              </label>

              <label>
                <input
                  type='radio'
                  name='sortByProduct'
                  value='asc'
                  onChange={handleChange}
                  checked={state.sortByProduct == 'asc'}></input>
                Asc
              </label>
              <label>
                <input
                  type='radio'
                  name='sortByProduct'
                  value='desc'
                  onChange={handleChange}
                  checked={state.sortByProduct == 'desc'}></input>
                Desc
              </label>
            </div>

            <div>
              <label>
                <b>Search By Category: </b>
              </label>
              <input
                type='text'
                name='searchByCat'
                onChange={handleChange}
                value={state.searchByCat}></input>
            </div>
            <div>
              <label>
                <b>Search By Product Name: </b>
              </label>
              <input
                type='text'
                name='searhByName'
                onChange={handleChange}
                value={state.searhByName}></input>
            </div>
            <br></br>
            <div>
              <button
                type='button'
                onClick={handleSubmit}>
                Submit
              </button>
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
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Created At</th>
                <th>Buttons</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((d) => {
                return (
                  <tr key={d._id}>
                    <td>{d.productName}</td>
                    <td>{d.description}</td>
                    <td>{d.price}</td>
                    <td>{d.quantity}</td>
                    <td>{d.category}</td>
                    <td>{formatDate(d.createdAt)}</td>
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

      {state.isEdit && (
        <Form
          productName={state.productName}
          description={state.description}
          price={state.price}
          quantity={state.quantity}
          category={state.category}
          isEdit={state.isEdit}
          handleChange={handleChange}
          handleSubmitEdit={handleSubmitEdit}></Form>
      )}
    </>
  );
}
