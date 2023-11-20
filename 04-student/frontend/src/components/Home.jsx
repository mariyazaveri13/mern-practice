import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <button type="button">
        <Link to="/form">Add Student</Link>
      </button>
      <h1>Home</h1>
    </>
  );
}
