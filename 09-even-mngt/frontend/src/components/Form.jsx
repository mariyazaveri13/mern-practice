import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Form() {
  //set State
  const [state, setState] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    attendees: [],
  });

  //add a validation date of an event cannot be past date
  function validateDate(date) {
    if (new Date(date) <= new Date()) {
      return false;
    }
    return true;
  }

  //write on change function
  function handleChange(e) {
    const { value, type, name } = e.target;
    setState((p) => ({
      ...p,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (!validateDate(state.date)) {
        console.log('date validation failed');
        alert('Date cannot be of past');
        return;
      }

      if (state.attendees.length == 0) {
        alert('Please add attendees');
        return;
      }

      console.log(state);

      const res = await axios.post('http://localhost:5000', state);
      alert(res.data.message);
      resetHandler();
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  function resetHandler() {
    setState((p) => ({
      ...p,
      title: '',
      description: '',
      date: '',
      location: '',
      attendees: [],
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
            name='title'
            placeholder='Please Enter title'
            onChange={handleChange}
            value={state.title}
          />
        </div>
        <div>
          <input
            type='text'
            name='description'
            placeholder='Please Enter description'
            onChange={handleChange}
            value={state.description}
          />
        </div>
        <div>
          <input
            type='date'
            name='date'
            placeholder='Please Enter date'
            onChange={handleChange}
            value={state.date}
          />
        </div>
        <div>
          <input
            type='text'
            name='location'
            placeholder='Please Enter location'
            onChange={handleChange}
            value={state.location}
          />
        </div>
        <div>
          <button
            type='button'
            name='addAttendee'
            onClick={handleAddAttendee}>
            Add attendee
          </button>
        </div>
        {
          /* //have a map and iterate amongst all the attendees */
          state.attendees.map((a, index) => {
            return (
              <div key={index}>
                <div>
                  <input
                    type='text'
                    name='name'
                    placeholder='Please Enter name'
                    value={state.attendees[index].name}
                    onChange={(e) =>
                      handleAttendeeChange(index, 'name', e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <input
                    type='text'
                    name='feedback'
                    placeholder='Please Enter feedback'
                    value={state.attendees[index].feedback}
                    onChange={(e) =>
                      handleAttendeeChange(index, 'feedback', e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            );
          })
        }

        <div>
          <button onClick={handleSubmit}>Submit</button>{' '}
        </div>
      </form>
    </>
  );
}
