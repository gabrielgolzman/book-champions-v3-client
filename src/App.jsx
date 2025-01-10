import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import Login from './components/auth/login/Login';
import Dashboard from './components/library/dashboard/Dashboard';
import Protected from './components/auth/protected/Protected';
import NotFound from './components/auth/notFound/NotFound';

import './App.css'

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogIn = () => {
    setLoggedIn(true)
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='login' />} />
          <Route path='/login' element={<Login onLogin={handleLogIn} />} />
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
