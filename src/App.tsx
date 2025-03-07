import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile';
import BookList from './pages/BookList';
import BookForm from './pages/BookForm';
import GenreManager from './pages/GenreManager';
import BookDetail from './pages/BookDetail';

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
              <Route path='/books' element={<BookList />} />
              <Route path="/books/:id" element={<BookDetail />} />
              <Route path="/books/new" element={<BookForm />} />
              <Route path="/books/edit/:id" element={<BookForm />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/genres' element={<GenreManager/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
