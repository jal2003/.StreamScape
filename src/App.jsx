import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // This check ensures we don't navigate unnecessarily if we're already on the desired route
      if (user && window.location.pathname === '/login') {
        console.log("Logged In");
        navigate('/'); // Navigate to home only if we're on the login page
      } else if (!user && window.location.pathname !== '/login') {
        console.log("Logged Out");
        navigate('/login'); // Navigate to login only if we're not already there
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [navigate]); // include navigate in the dependency array

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;
