import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Registration from './Components/Registeration';
import Login from './Components/Login';
import Home from './Components/Home';
import Forget from './Components/Forget';
import UsersList from './Admin/Userslist';
import AddScholarship from './Admin/AddScholarship';
import Scholarshiplist from './Admin/Scholarshiplist';
import Scholarshiplistforstudent from './Components/Scholarshiplistforstudent';
import Facultylogin from './Admin/Facultylogin';
import Facultydashboard from './Admin/Facultydashboard';
import Addnews from './Admin/Addnews';
import Dashboard from './Components/Dashboard';
import ApplyScholarship from './Components/ApplyScholarship';
import Status from './Components/Status';
import Applications from './Admin/Applications';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import './App.css'; 

const App = () => {
   
  return (
    <Router>
       <div className='content-area'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path='/Userslist' element={<UsersList/>}/>
          <Route path='/Forget' element={<Forget/>}/>
          <Route path='/AddScholarship' element={<AddScholarship/>}/>
          <Route path='/Scholarshiplist' element={<Scholarshiplist/>}/>
          <Route path='/Scholarshiplistforstudent' element={<Scholarshiplistforstudent/>}/>
          <Route path='/Dashboard' element={<Dashboard/>}/>
          <Route path='/Facultylogin' element={<Facultylogin/>}/>
          <Route path='/Facultydashboard' element={<Facultydashboard/>}/>
          <Route path='/Addnews' element={<Addnews/>}/>
          <Route path='/ApplyScholarship' element={<ApplyScholarship/>}/>
          <Route path='/Status' element={<Status/>}/>
          <Route path='/Applications' element={<Applications/>}/>
        </Routes>
        </div>
       
    </Router>
  );
};

export default App;
