import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import './Scholarshiplistforstudent.css';
import { IoArrowBackOutline, IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const Scholarshiplistforstudent = () => {
    const [scholarshipList, setScholarshipList] = useState([]);
    const [database, setDatabase] = useState(null);
    const [searchName, setSearchName] = useState('');
    

    useEffect(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyBj5kZy9sskXEg0xlbMDg35-pVvSTJm9Zw",
            authDomain: "cuischolarship-23b42.firebaseapp.com",
            projectId: "cuischolarship-23b42",
            storageBucket: "cuischolarship-23b42.appspot.com",
            messagingSenderId: "361327887400",
            appId: "1:361327887400:web:9a6386f40f1c34b95fe11d",
        };

        const firebaseApp = initializeApp(firebaseConfig);
        setDatabase(getDatabase(firebaseApp));
        const databaseRef = ref(getDatabase(firebaseApp), 'Scholarshipdata');
        const onDataChange = (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const scholarshipArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setScholarshipList(scholarshipArray);
            } else {
                setScholarshipList([]);
            }
        };
        onValue(databaseRef, onDataChange);
    }, []);
    const filteredScholarships = scholarshipList.filter((scholarship) => {
        const titleMatches =
            searchName === '' || scholarship.scholarshipTitle.toLowerCase().includes(searchName.toLowerCase());

        return titleMatches;
    });
    const navigatetonextpage = () => {
        navigate('/Dashboard');
    };

    const navigate = useNavigate();
    const navigateToApplyScholarship = (title) => {
        navigate('/ApplyScholarship', { state: { scholarshipTitle: title } });
    };

    return (
        <div className='mainarea-userlist'>
            <h4 className='Scholarship-heading-top'>Scholarships</h4>
            <div className="top-search-section">
                <IoArrowBackOutline className='back-logo' onClick={navigatetonextpage} />
                <input className='search-input'
                    placeholder='Search Scholarship Here'
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}></input>
                <IoSearch className='search-logo' />

            </div>

            {filteredScholarships.length > 0 ? (
                <ul className='Userslist'>
                    {filteredScholarships.map((scholarship) => (
                        <li className='editareaofuser' key={scholarship.id}>
                            <div className='usernumberdiv'>
                                <div className='leftsidecontentscholarship'>
                                    <p className='Scholarship-det-text'> <strong className='strong'>Title:</strong> {scholarship.scholarshipTitle}</p>
                                    <p className='Scholarship-det-text'> <strong className='strong'>Type:</strong> {scholarship.scholarshipType}</p>
                                    <p className='Scholarship-det-text'> <strong className='strong'>Amount:</strong> {scholarship.scholarshipAmount}</p>
                                    <p className='Scholarship-det-text'> <strong className='strong'>Criteria:</strong> {scholarship.eligibilityCriteria}</p>
                                </div>
                                <div className="actions">
                                    <button className='submitbtn'
                                        onClick={() => navigateToApplyScholarship(scholarship.scholarshipTitle)}
                                    >Apply</button>
                                </div>
                            </div>

                        </li>
                    ))}
                </ul>
            ) : (
                <p>No scholarships available</p>
            )}
        </div>
    );
};

export default Scholarshiplistforstudent;
