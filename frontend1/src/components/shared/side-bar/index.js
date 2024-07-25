// import React from 'react'
// import styles from './sidebar.module.scss'
// import BrandLogo from '../brand'
// import {Icon} from '@iconify/react'
// import sidebaritems from "../../../data/sidebar.json"
// import { useNavigate } from 'react-router-dom'
// import utils from '../../../utils/localstorage'
// import types from '../../../config/types'

// function SideBar() {
//   const navigate=useNavigate()
  
  

// const handleClick = (item) => {
//   if (item.path === '/notes') {
//       const data = utils.getFromLocalStorage(types.NOTES_DATA);
//       const updatedData = [{
//           id: data.length + 1,
//           color: "rgba(174, 223, 232, 0.6)",
//           text: "",  // Ensure 'text' is initialized properly
//           createdAt: new Date().toISOString()
//       }, ...data];
//       utils.addToLocalStorage(types.NOTES_DATA, updatedData);
      
//   }
// }
//   const handleLogout=()=>{
//     utils.removeFromLocalStorage('auth_key');
//     navigate("/");
//   }

//   return (
//     <article className={styles.sidebar}>
//         <BrandLogo  visible={true} type={"dark"} className={styles.logo}/>
//         <section>
//             {
//               sidebaritems.map((item,index)=>{
//                 return(
//                 <article key={index}  className={styles.item} onClick={()=>handleClick(item)}>
//                   <Icon icon={item.icon} color={index === 1 ? "var(--grey-300)" : " var(--white)" }/>
//                 </article>
//                 );
//               }
//             )}
//         </section>
//         <article className={styles.logout}>
//             <Icon icon={'material-symbols:logout'} onClick={handleLogout}/>
//         </article>
//     </article>
//   )
// }

// export default SideBar;


import React, { useState, useEffect } from 'react';
import styles from './sidebar.module.scss';
import BrandLogo from '../brand';
import { Icon } from '@iconify/react';
import sidebaritems from "../../../data/sidebar.json";
import { useNavigate } from 'react-router-dom';
import utils from '../../../utils/localstorage';
import types from '../../../config/types';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function SideBar() {
  const navigate = useNavigate();
  const [notesData, setNotesData] = useState([]); // State to store notes
  const authToken = utils.getFromLocalStorage('auth_key'); // Retrieve token
  console.log(authToken)
  // Fetch notes data on component mount
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/notes', { // Assuming your backend API endpoint
          headers: {
            authorization: authToken, // Include auth token in header
          },
        });
        if(response.ok){
        const data = await response.json();
        setNotesData(Array.isArray(data) ? data : []);
        }
        else {
          console.error('Error fetching notes:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [authToken]); // Empty dependency array for initial fetch

  const handleAddNote = async () => {
    console.log('Adding note called')
    try {
      const newNote = {
        text: "Type something", // Ensure 'text' is initialized properly
        createdAt: new Date().toISOString(),
      };
  
      
      const response = await fetch('http://localhost:3001/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: authToken, // Include token
        },
        body: JSON.stringify(newNote),
      });
  
      if (response.ok) {
        const updatedData = [newNote, ...notesData];
        setNotesData(updatedData);
        navigate('/notes');
      } else {
        console.error('Error creating note:', await response.text());
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };
  
  const handleLogout = () => {
    utils.removeFromLocalStorage('auth_key');
    navigate('/');
  };

  return (
    <article className={styles.sidebar}>
      <BrandLogo visible={true} type={"dark"} className={styles.logo} />
      <section>
        {sidebaritems.map((item, index) => {
          return (
            <article key={index} className={styles.item} onClick={() => {
              if (item.path === '/notes') {
                handleAddNote(); // Call handleAddNote on notes click
              } else {
                navigate(item.path); // Handle other navigation logic
              }
            }}>
              <Icon icon={item.icon} color={index === 1 ? "var(--grey-300)" : " var(--white)" } />
            </article>
          );
        })}
      </section>
      <article className={styles.logout}>
        <Icon icon={'material-symbols:logout'} onClick={handleLogout} />
      </article>
    </article>
  );
}

export default SideBar;
