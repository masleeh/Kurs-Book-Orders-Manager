import React from 'react';
import Login from './pages/login'
import Manager from './pages/manager';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Orders from './components/orders';
import Stats from './components/statistics';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={<Navigate to="login"/>}/>
          <Route path='login' element={<Login />}/>
          <Route path='manager/*' element={<Manager />} />
      </Routes>
    </div>
  );
}

export default App;
