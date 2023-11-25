import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import Form from './components/Form'
import Stats from './components/Stats'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/form' element={<Form></Form>}></Route>
          <Route path='/stats' element={<Stats></Stats>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
