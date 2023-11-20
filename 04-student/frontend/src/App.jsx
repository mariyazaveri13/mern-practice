import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/form" element={<Form></Form>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
