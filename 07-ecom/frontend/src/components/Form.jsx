import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Form(props) {
  //set State
  const [state, setState] = useState({
    productName: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
  });

  //write on change function
  function handleChange(e) {
    const { type, name, value } = e.target;
    setState((preState) => ({
      ...preState,
      [name]: type === 'number' ? Number(value) : value,
    }));
  }

  function validateStr(str) {
    return /^[a-zA-Z ]*$/.test(str);
  }

  function validateNum(num) {
    return /^[0-9]\d*$/.test(num);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      validateNum(state.price) &&
      validateNum(state.quantity) &&
      validateStr(state.productName) &&
      state.category &&
      state.description
    ) {
      saveData();
      setState((preState) => ({
        ...preState,
        productName: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
      }));
    } else {
      alert('validation failed');
    }
  }

  async function saveData() {
    try {
      const res = await axios.post('http://localhost:5000/', state);
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <>
      <h2>Form</h2>
      <button type='button'>
        <Link to='/'>Back</Link>
      </button>
      <button type='button'>
        <Link to='/stats'>Stats</Link>
      </button>

      <form>
        <div>
          <input
            type='text'
            name='productName'
            placeholder='Please Enter Name'
            value={props.isEdit ? props.productName : state.productName}
            onChange={props.isEdit ? props.handleChange : handleChange}
          />
        </div>

        <div>
          <input
            type='text'
            name='description'
            placeholder='Please Enter description'
            value={props.isEdit ? props.description : state.description}
            onChange={props.isEdit ? props.handleChange : handleChange}
          />
        </div>

        <div>
          <input
            type='number'
            name='price'
            placeholder='Please Enter price'
            value={props.isEdit ? props.price : state.price}
            onChange={props.isEdit ? props.handleChange : handleChange}
          />
        </div>

        <div>
          <input
            type='number'
            name='quantity'
            placeholder='Please Enter quantity'
            value={props.isEdit ? props.quantity : state.quantity}
            onChange={props.isEdit ? props.handleChange : handleChange}
          />
        </div>

        <div>
          <input
            type='text'
            name='category'
            placeholder='Please Enter category'
            value={props.isEdit ? props.category : state.category}
            onChange={props.isEdit ? props.handleChange : handleChange}
          />
        </div>

        <div>
          <button
            type='button'
            onClick={props.isEdit ? props.handleSubmitEdit : handleSubmit}>
            Submit
          </button>{' '}
        </div>
      </form>
    </>
  );
}
