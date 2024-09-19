import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './components/Users'
import AddUser from './components/AddUser'
import UpdateUser from './components/UpdateUser'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/add" element={<AddUser />}></Route>
          <Route path="/update/:id" element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
