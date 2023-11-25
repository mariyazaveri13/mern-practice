import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Form() {
  //set State
  const [state, setState] = useState({});

  //write on change function
  function handleChange() {}

  function handleSubmit() {}

  return (
    <>
      <h2>Form</h2>
      <button type='button'>
        <Link to='/'>Back</Link>
      </button>
      {'          '}
      <button type='button'>
        <Link to='/stats'>Stats</Link>
      </button>

      <form>
        <div>
          <input
            type='text'
            name=''
            placeholder='Please Enter '
          />
        </div>

        <div>
          <input
            type='text'
            name=''
            placeholder='Please Enter '
          />
        </div>

        <div>
          <input
            type='text'
            name=''
            placeholder='Please Enter '
          />
        </div>

        <div>
          <input
            type='text'
            name=''
            placeholder='Please Enter '
          />
        </div>

        <div>
          <button type='button'>Submit</button>{' '}
        </div>
      </form>
    </>
  );
}
