import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import Login from './components/auth/login/Login';
import Dashboard from './components/library/dashboard/Dashboard';
import Protected from './components/auth/protected/Protected';
import NotFound from './components/auth/notFound/NotFound';

import './App.css'
import { ToastContainer } from 'react-toastify';
import Register from './components/auth/register/Register';

const App = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<Protected />}>
            <Route
              path='/library/*'
              element={
                <Dashboard />
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
