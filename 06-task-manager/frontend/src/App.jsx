
import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Stats from './components/Stats';
import AddTask from './components/AddTask';

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/task' element={<AddTask />}></Route>
          <Route path='/stats' element={<Stats />}></Route>
        </Routes>
      </BrowserRouter>
      <div></div>
    </>
  )
}

export default App
