import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='flex flex-col'>
          <Navbar/>
          <Toaster position="top-center" reverseOrder={false} />
          <div className="flex grow justify-center items-center">
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
