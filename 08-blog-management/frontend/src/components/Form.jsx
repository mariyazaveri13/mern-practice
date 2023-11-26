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
      <button type='button'>
        <Link to='/stats'>Stats</Link>
      </button>

      <form>
        <div>
          <input
            type='text'
            name='title'
            placeholder='Please Enter title'
          />
        </div>

        <div>
          <input
            type='text'
            name='content'
            placeholder='Please Enter content'
          />
        </div>

        <div>
          <input
            type='text'
            name='author'
            placeholder='Please Enter author'
          />
        </div>

        <div>
          <input
            type='date'
            name='publicationDate'
            placeholder='Please Enter publicationDate '
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
            />
          </label>
        </div>

        <div>
          <button type='button'>Submit</button>{' '}
        </div>
      </form>
    </>
  );
}
