import React, { useState, useEffect } from 'react';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { getDatabase, push, ref, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';  // Import onAuthStateChanged
import { app, auth } from '../firebase';
import './ApplyScholarship.css';

const ApplyScholarship = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scholarshipTitle = location.state?.scholarshipTitle;
  const database = getDatabase(app);
  const storage = getStorage(app);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {

        setUser(null);
      }
    });

    // Clean up the subscription when the component unmounts.
    return () => unsubscribe();
  }, []);


  const [formData, setFormData] = useState({
    title: '',
    pdfFile: null,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      pdfFile: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.pdfFile) {
        alert('Please select a file.');
        return;
      }

      const storageRefInstance = storageRef(storage, `ScholarshipsData/${formData.pdfFile.name}`);
      await uploadBytes(storageRefInstance, formData.pdfFile);
      const downloadURL = await getDownloadURL(storageRefInstance);

      if (!downloadURL) {
        alert('Error obtaining download URL. Please try again.');
        return;
      }

      const applicationsRef = push(ref(database, 'applications'));
      const applicationData = {
        title: scholarshipTitle,
        fileURL: downloadURL,
        status: 'pending',
        email: user.email,
      };

      await set(applicationsRef, applicationData);

      alert('Application Submitted');
      navigate('/Status');
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };

  return (

    <div className="main-area-div">
      <div className="top-heading-area">
        <div className="left-logo-side">
          <img className='campusimg1' src='./cuilogo.png' alt="Dynamic Image" />
          <h3 className='university-logo-text'>CUI Scholarship Portal</h3>
        </div>
        <div className="right-logo-side"></div>
      </div>
      <div className="sub-area-div">
        <div className="form-area4">
          <center>

            <h3>Apply For Scholarship</h3>
          </center>
          <br />
          <h6 className="Stittle">{scholarshipTitle}</h6>
          <div className="inputdiv">
            <label>Select Documents: </label>
            <input
              type="file"
              id="pdfFile"
              name="pdfFile"
              onChange={handleFileChange}
              required
            />
          </div>
          <br />
          <button className="submitbtn" onClick={handleSubmit}>
            Submit Documents
          </button>
          <div className="centeredtextarea">
            <p className="simpletext">
              Back to <Link className="simpletextlink" to="/Scholarshiplistforstudent">Scholarships</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="bottom">
        <p className="footer-credit">
          Copyright © 2020, All Rights Reserved by CUOnline-COMSATS
        </p>
      </div>
    </div>

  );
};

export default ApplyScholarship;
