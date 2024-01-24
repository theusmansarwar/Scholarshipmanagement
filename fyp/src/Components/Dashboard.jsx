
import { SiGooglescholar } from "react-icons/si";
import { TbProgress } from "react-icons/tb";
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';
import { IoLogOutOutline } from "react-icons/io5";
const auth = getAuth(app);
const database = getDatabase(app);

const firebaseConfig = {
  apiKey: "AIzaSyBj5kZy9sskXEg0xlbMDg35-pVvSTJm9Zw",
  authDomain: "cuischolarship-23b42.firebaseapp.com",
  projectId: "cuischolarship-23b42",
  storageBucket: "cuischolarship-23b42.appspot.com",
  messagingSenderId: "361327887400",
  appId: "1:361327887400:web:9a6386f40f1c34b95fe11d",
};

const Dashboard = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
  
    const notificationsRef = ref(database, 'news');
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const notificationsData = snapshot.val();
      if (notificationsData) {
        const notificationsArray = Object.values(notificationsData);
        setNotifications(notificationsArray);
      } else {
        setNotifications([]);
      }
    });
  })
  const navigatetonextpage = () => {
    window.location.href = '/Scholarshiplistforstudent';
  };
  const navigatetonextpage2 = () => {
    window.location.href = '/Status';
  };
  const navigatetonextpage3 = () => {
    window.location.href = '/';
  };
  return (
    <div className="main-area-div">
      <div className="top-area">
        <div className="left-logo-side">
          <img className='campusimg1' src='./cuilogo.png' alt="Dynamic Image" />
          <h3 className='university-logo-text'>CUI Scholarship Portal</h3>
        </div>
        <div className="right-logo-side">
          <div className="logout-section" onClick={navigatetonextpage3}>
            <p className="logout-text">Logout</p>
            <IoLogOutOutline className="logout-button" />
          </div>
        </div>
      </div>
      <div className="dashboardmodulelist">
        <div className="module" onClick={navigatetonextpage}>
          <SiGooglescholar className="module-logo" />
          <p className='module-name'>Scholarships</p>
        </div>
        <div className="module" onClick={navigatetonextpage2}>
          <TbProgress className="module-logo" />
          <p className='module-name'>Status</p>
        </div>
      </div>
      <div className="latest-news-area">
        <h3 className='news-section-heading2'>Latest News</h3>
        <ul className="news-list-area">
          {notifications.map((notification, index) => (
            <li key={index} className='news-text-area'>
              <h4>{notification.title}</h4>
              <p className="news-description">{notification.description}</p>
              <a href={notification.link}>Show more</a>


            </li>
          ))}
        </ul>

      </div>

      <div className="bottom">
        <p className='footer-credit'>Copyright © 2020, All Rights Reserved by CUOnline-COMSATS</p>
      </div>

    </div>
  )
}

export default Dashboard