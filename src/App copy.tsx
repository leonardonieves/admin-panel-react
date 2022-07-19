import React from 'react';
import './app.css'
import Home from './components/pages/home/Dashboard';
import SideBar from './components/sidebar/SideBar';
import TopBar from './components/topbar/TopBar';

function App() {
  return (
    <div className="App">
      <TopBar />
      <div className="container">
        <SideBar />
        <Home />
        
      </div>      
    </div>
  );
}

export default App;
