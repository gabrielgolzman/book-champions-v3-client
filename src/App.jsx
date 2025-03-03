import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import Login from './components/auth/login/Login';
import Dashboard from './components/library/dashboard/Dashboard';
import Protected from './components/auth/protected/Protected';
import NotFound from './components/auth/notFound/NotFound';

import './App.css'
import { ToastContainer } from 'react-toastify';
import Register from './components/auth/register/Register';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogIn = () => {
    setLoggedIn(true)
  }

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("book-champions-token");
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='login' />} />
          <Route path='/login' element={<Login onLogin={handleLogIn} />} />
          <Route path='/register' element={<Register />} />
          <Route element={<Protected isSignedIn={loggedIn} />}>
            <Route
              path='/library/*'
              element={
                <Dashboard onLogout={handleLogout} />
              }>
            </Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
