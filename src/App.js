import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './Menu';
import Header from './Header';

import Dashboard from './Dashboard';
import Login from './Login';

import Users from './Users';


import Stakeholders from './Stakeholders';
import Cars from './Cars';
import Stations from './Stations'


import FarmMap from './Maps';

import Maps from './Maps';

import Resetp from './Resetp';

import PlansMap from './ViewMapPlans';

function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Maps />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/PlansMap" element={<PlansMap />} />
        <Route path="/Resetp" element={<Resetp />} />
        <Route path="/dashboard" element={ <> <Header /> <Menu /><Dashboard /> </>} />
        <Route path="/Maps" element={<MapsWithMenu />} />
        <Route path="/Maps" element={<UsersWithMenu />} />
        <Route path="/Maps" element={<StakeholdersWithMenu />} />
     
        
        <Route path="/Maps" element={<CarsWithMenu />} />
        
        <Route path="/Maps" element={<StationsWithMenu />} />

      </Routes>
    </Router>
  );
}

function StakeholdersWithMenu() {
  return (
    <>
      <Header />
      <Menu />
      <Stakeholders/>
    </>
  );
}

function CarsWithMenu() {
  return (
    <>
      <Header />
      <Menu />
      <Cars/>
    </>
  );
}

function StationsWithMenu() {
  return (
    <>
      <Header />
      <Menu />
      <Stations/>
    </>
  );
}

function UsersWithMenu() {
  return (
    <>
      <Header />
      <Menu />
      <Users />
    </>
  );
}

function MapsWithMenu() {
  return (
    <>
      <Header />
      <Menu />
      <Maps />
    </>
  );
}

function DashboardWithMenu() {return (
    <>
      <Header />
      <Menu />
      <Dashboard />
    </>
  );
}

export default App;
