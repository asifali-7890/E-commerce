import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer.jsx';
import Home from './pages/Home';
import Add from './pages/Add';
import Update from './pages/Update';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login.jsx';
import ProductList from './pages/ProductList.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <div className="content pt-16">
          <Routes>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<ProductList />} />
              <Route path='/add' element={<Add />} />
              <Route path='/update/:id' element={<Update />} />
              {/* <Route path='/logout' element={<Logout />} /> */}
              <Route path='/profile' element={<Profile />} />
            </Route>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;