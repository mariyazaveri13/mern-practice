import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Form(props) {
  //set State
  const [state, setState] = useState({
    title: '',
    content: '',
    author: '',
    publicationDate: '',
    category: [],
  });

  //write on change function
  function handleChange(e) {
    const { type, checked, name, value } = e.target;

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

    setState((p) => ({
      ...p,
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
    if (!validateStr(state.author)) {
      alert('please enter only alphabets');
      return;
    }

    if (
      !state.title ||
      !state.author ||
      !state.publicationDate ||
      !state.content ||
      state.category.length == 0
    ) {
      alert('Please enter all data');
      return;
    }

    submitData();
    handleReset();
  }

  async function submitData() {
    try {
      const res = await axios.post('http://localhost:5000', state);
      alert(res.data.message);
    } catch (error) {
      alert(error.message);
    }
  }

  function handleReset() {
    setState((p) => ({
      ...p,
      title: '',
      content: '',
      author: '',
      publicationDate: '',
      category: '',
    }));
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
            name='title'
            placeholder='Please Enter title'
            value={props.isEdited ? props.title : state.title}
            onChange={props.isEdited ? props.handleChange : handleChange}
          />
        </div>

        <div>
          <input
            type='text'
            name='content'
            placeholder='Please Enter content'
            value={props.isEdited ? props.content : state.content}
            onChange={props.isEdited ? props.handleChange : handleChange}
          />
        </div>

        <div>
          <input
            type='text'
            name='author'
            placeholder='Please Enter author'
            value={props.isEdited ? props.author : state.author}
            onChange={props.isEdited ? props.handleChange : handleChange}
          />
        </div>

        <div>
          <input
            type='date'
            name='publicationDate'
            placeholder='Please Enter publicationDate '
            value={
              props.isEdited ? props.publicationDate : state.publicationDate
            }
            onChange={props.isEdited ? props.handleChange : handleChange}
          />
        </div>
        <label>Enter category</label>
        <div>
          <label>
            Fiction
            <input
              type='checkbox'
              name='category'
              value='Fiction'
              onChange={props.isEdited ? props.handleChange : handleChange}
              checked={
                props.isEdited
                  ? props.category.includes('Fiction')
                  : state.category.includes('Fiction')
              }
            />
          </label>
        </div>
        <div>
          <label>
            Non Fiction
            <input
              type='checkbox'
              name='category'
              value='NonFiction'
              onChange={props.isEdited ? props.handleChange : handleChange}
              checked={
                props.isEdited
                  ? props.category.includes('NonFiction')
                  : state.category.includes('NonFiction')
              }
            />
          </label>
        </div>
        <div>
          <label>
            Other
            <input
              type='checkbox'
              name='category'
              value='Other'
              onChange={props.isEdited ? props.handleChange : handleChange}
              checked={
                props.isEdited
                  ? props.category.includes('Other')
                  : state.category.includes('Other')
              }
            />
          </label>
        </div>

        <div>
          <button
            type='button'
            onClick={props.isEdited ? props.handleEditSubmit : handleSubmit}>
            Submit
          </button>{' '}
        </div>
      </form>
    </>
  );
}
