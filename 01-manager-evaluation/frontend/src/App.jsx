import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ManagerEval from './Components/ManagerEval';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/addmanagerreview"
            element={<ManagerEval></ManagerEval>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
