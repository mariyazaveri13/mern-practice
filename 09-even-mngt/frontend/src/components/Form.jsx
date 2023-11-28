import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Form(props) {
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
        alert('Date cannot be of past');
        return;
      }

      if (state.attendees.length == 0) {
        alert('Please add attendees');
        return;
      }

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
            value={!props.type ? state.title : props.title}
            disabled={props.type === 'view'}
          />
        </div>
        <div>
          <input
            type='text'
            name='description'
            placeholder='Please Enter description'
            onChange={handleChange}
            value={!props.type ? state.description : props.description}
            disabled={props.type === 'view'}
          />
        </div>
        <div>
          <input
            type='date'
            name='date'
            placeholder='Please Enter date'
            onChange={handleChange}
            value={!props.type ? state.date : props.date}
            disabled={props.type === 'view'}
          />
        </div>
        <div>
          <input
            type='text'
            name='location'
            placeholder='Please Enter location'
            onChange={handleChange}
            value={!props.type ? state.location : props.location}
            disabled={props.type === 'view'}
          />
        </div>

        {props.type !== 'view' && (
          <div>
            <button
              type='button'
              name='addAttendee'
              onClick={
                !props.type ? handleAddAttendee : props.handleAddAttendee
              }>
              Add attendee
            </button>
          </div>
        )}
        <h2>Attendees:</h2>
        {!props.type &&
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
          })}
        {props.type &&
          /* //have a map and iterate amongst all the attendees */
          props.attendees.map((a, index) => {
            return (
              <div key={index}>
                <div>
                  <input
                    type='text'
                    name='name'
                    placeholder='Please Enter name'
                    value={a.name}
                    disabled={props.type === 'view'}
                    onChange={(e) =>
                      props.handleAttendeeChange(index, 'name', e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <input
                    type='text'
                    name='feedback'
                    placeholder='Please Enter feedback'
                    value={a.feedback}
                    disabled={props.type === 'view'}
                    onChange={(e) =>
                      props.handleAttendeeChange(
                        index,
                        'feedback',
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>
            );
          })}
        {props.type !== 'view' && (
          <div>
            <button
              onClick={!props.type ? handleSubmit : props.handleSubmitEdit}>
              Submit
            </button>{' '}
          </div>
        )}
      </form>
    </>
  );
}
