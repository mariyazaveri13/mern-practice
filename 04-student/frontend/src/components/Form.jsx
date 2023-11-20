import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Form() {
  const [state, setState] = useState({
    name: '',
    email: '',
    extraClassOpted: '',
    gender: '',
    hobbies: '',
    languages: '',
    paper1: '',
    paper2: '',
    paper3: '',
  });

  function changeHandler(e) {
    const { type, value, checked, name } = e.target;
    if (name == 'extraClassOpted') {
      setState((preState) => ({
        ...preState,
        extraClassOpted: checked ? true : false,
      }));
      return;
    }
    if (type == 'checkbox') {
      if (checked) {
        setState((preState) => ({
          ...preState,
          languages: [...preState.languages, value],
        }));
      } else {
        setState((preState) => ({
          ...preState,
          languages: preState.languages.filter((d) => d != value),
        }));
      }
      return;
    }
    setState((preState) => ({
      ...preState,
      [name]: type == 'number' ? Number(value) : value,
    }));
  }

  function validateNumber(str) {
    return /^[0-9]\d*$/.test(str);
  }

  function validateString(str) {
    return /^[a-zA-Z ]*$/.test(str);
  }

  function submitHandler(e) {
    e.preventDefault();
    const {
      name,
      email,
      extraClassOpted,
      gender,
      hobbies,
      languages,
      paper1,
      paper2,
      paper3,
    } = state;

    if (
      !name ||
      !email ||
      !extraClassOpted ||
      !gender ||
      !hobbies ||
      !languages ||
      !paper1 ||
      !paper2 ||
      !paper3
    ) {
      alert('Fill all details');
      return;
    }

    if (
      !validateNumber(paper1) ||
      !validateNumber(paper2) ||
      !validateNumber(paper3)
    ) {
      alert('Enter number values in number fields');
      return;
    }

    if (!validateString(name)) {
      alert('Only alphabets allowed');
      return;
    }

    sendData();
    resetHandler();
  }

  async function sendData() {
    try {
      const data = await axios.post('http://localhost:5000', state);
      alert(data.data.message);
    } catch (error) {
      if (error.response.data.message) alert(error.response.data.message);
      else alert(error.message);
    }
  }

  function resetHandler() {
    setState((preState) => ({
      ...preState,
      name: '',
      email: '',
      extraClassOpted: '',
      gender: '',
      languages: '',
      hobbies: '',
      paper1: '',
      paper2: '',
      paper3: '',
    }));
  }

  return (
    <>
      <button type="button">
        <Link to="/">Home</Link>
      </button>
      <h1>Form </h1>
      <>
        <form onSubmit={submitHandler}>
          <div>
            <label for="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={state.name}
              onChange={changeHandler}
            ></input>
          </div>
          <div>
            <label for="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={changeHandler}
            ></input>
          </div>
          <div>
            <label for="extraClassOpted">Extra Class Opted: </label>
            <input
              type="checkbox"
              id="extraClassOpted"
              name="extraClassOpted"
              checked={state.extraClassOpted}
              onChange={changeHandler}
            ></input>
          </div>
          <div>
            <label for="gender">Gender: </label>
            <label for="male"> Male</label>
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={state.gender == 'Male'}
              onChange={changeHandler}
            ></input>

            <label for="female"> Female</label>
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={state.gender == 'Female'}
              onChange={changeHandler}
            ></input>
          </div>
          <div>
            <label for="hobbies">Hobbies(CSV): </label>
            <input
              type="text"
              id="hobbies"
              name="hobbies"
              value={state.hobbies}
              onChange={changeHandler}
            ></input>
          </div>
          <div>
            <label for="languages">Languages: </label>
            <label for="English">English</label>
            <input
              type="checkbox"
              id="English"
              name="languages"
              onChange={changeHandler}
              value="English"
              checked={state.languages.includes('English')}
            ></input>
            <label for="Gujarati">Gujarati</label>
            <input
              type="checkbox"
              id="Gujarati"
              name="languages"
              onChange={changeHandler}
              value="Gujarati"
              checked={state.languages.includes('Gujarati')}
            ></input>
            <label for="Hindi">Hindi</label>
            <input
              type="checkbox"
              id="Hindi"
              name="languages"
              onChange={changeHandler}
              value="Hindi"
              checked={state.languages.includes('Hindi')}
            ></input>
            <label for="Others">Others</label>
            <input
              type="checkbox"
              id="Others"
              name="languages"
              onChange={changeHandler}
              value="Others"
              checked={state.languages.includes('Others')}
            ></input>
          </div>
          <div>
            <label for="paper1">paper1: </label>
            <input
              type="number"
              id="paper1"
              name="paper1"
              value={state.paper1}
              onChange={changeHandler}
            ></input>
          </div>
          <div>
            <label for="paper2">paper2: </label>
            <input
              type="number"
              id="paper2"
              name="paper2"
              value={state.paper2}
              onChange={changeHandler}
            ></input>
          </div>
          <div>
            <label for="paper3">paper3: </label>
            <input
              type="number"
              id="paper3"
              name="paper3"
              value={state.paper3}
              onChange={changeHandler}
            ></input>
          </div>
          <div>
            <button>Submit</button>
            <button onClick={resetHandler} type="button">
              Reset
            </button>
          </div>
        </form>
      </>
    </>
  );
}
