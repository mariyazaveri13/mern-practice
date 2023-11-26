import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Stats() {
  //set State

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const res = await axios.get('http://localhost:5000/stats');
      setState((p) => ({
        ...p,
        totalNumOfProducts: res.data[0].totalNumOfProducts,
        avgProdPrice: res.data[0].avgProdPrice,
      }));
    } catch (error) {}
  }

  const [state, setState] = useState({
    totalNumOfProducts: '',
    avgProdPrice: '',
  });

  return (
    <>
      <h1>Stats</h1>
      <button type='button'>
        <Link to='/form'>Add New </Link>
      </button>
      {'          '}
      <button type='button'>
        <Link to='/'>Home</Link>
      </button>

      <div>Total number of products : {state.totalNumOfProducts}</div>

      <div>Average product price : {state.avgProdPrice}</div>
    </>
  );
}
