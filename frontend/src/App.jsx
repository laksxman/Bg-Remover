import React from 'react'
import { Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Result from './pages/Result';

function App() {
  return (
    <div className="container mx-auto">
      <div className="w-full h-full">
        <ToastContainer />
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
