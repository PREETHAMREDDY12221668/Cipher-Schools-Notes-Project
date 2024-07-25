// // import React, { useEffect, useState } from 'react';
// // import styles from './notes.module.scss';
// // import Wrapper from '../../components/HOC/wrapper';
// // import Greeting from '../../components/atoms/greeting';
// // import Note from '../../components/cards/note';
// // import notesData from '../../data/notes.json';
// // import utils from '../../utils/localstorage.js';
// // import types from '../../config/types.js';

// // function Notes() {
// //   const [notesCollection, setNotesCollection] = useState([]);
// //   const data = utils.getFromLocalStorage(types.NOTES_DATA);

// //   useEffect(() => {

    
// //     if (data && data.length) {
// //       setNotesCollection(data);
// //       return;
// //     } 
// //       utils.addToLocalStorage(types.NOTES_DATA, notesData);
// //       setNotesCollection(notesData);
    
// //   }, [data]); // Empty dependency array ensures this effect runs only once

// //   return (
// //     <section className={styles.container}>
// //       <Greeting />
// //       <main>
// //         {notesCollection.map((note) => (
// //           <Note key={note.id} text={note.text.trim()} date={note.createdAt} color={note.color} />
// //         ))}
// //       </main>
// //     </section>
// //   );
// // }

// // export default Wrapper(Notes);


// import React, { useEffect, useState } from 'react';
// import styles from './notes.module.scss';
// import Wrapper from '../../components/HOC/wrapper';
// import Greeting from '../../components/atoms/greeting';
// import Note from '../../components/cards/note';
// import { toast } from 'react-toastify';
// import utils from '../../utils/localstorage.js';

// function Notes() {
//   const [notesCollection, setNotesCollection] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const authToken = utils.getFromLocalStorage('auth_key');
//   const Now =new Date().toISOString();

//   useEffect(() => {
//     if (!authToken) {
//       toast.error("Unauthorized access!");
//       setLoading(false);
//       return;
//     }

//     fetch("http://localhost:3001/api/notes", {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         authorization: authToken,
//       }
//     })
//     .then((res) => res.json())
//     .then((data) => {
//       if (data.success) {
//         setNotesCollection(data.notes);
//       } else {
//         setError(data.message || "Failed to fetch notes");
//       }
//       setLoading(false);
//     })
//     .catch((error) => {
//       setError("Something went wrong");
//       setLoading(false);
//     });
//   }, [authToken]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <section className={styles.container}>
//       <Greeting />
//       <main>
//       <Note text="Create New Note..." date={Now}  color="var(--opaque-light-cyan)" />
//           {notesCollection.map((note) => (
//           <Note key={note._id} text={note.text.trim()} date={note.createdAt} color={note.color} />
//         ))}
        
//       </main>
//     </section>
//   );
// }

// export default Wrapper(Notes);
import React, { useEffect, useState } from 'react';
import styles from './notes.module.scss';
import Wrapper from '../../components/HOC/wrapper';
import Greeting from '../../components/atoms/greeting';
import Note from '../../components/cards/note';
import { toast } from 'react-toastify';
import utils from '../../utils/localstorage.js';
import Loader from '../../components/shared/loader/index.js';

function Notes() {
  const [notesCollection, setNotesCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const authToken = utils.getFromLocalStorage('auth_key');
  const Now = new Date().toISOString();

  useEffect(() => {
    if (!authToken) {
      toast.error("Unauthorized access!");
      setLoading(false);
      return;
    }

    fetch("http://localhost:3001/api/notes", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: authToken,
      }
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setNotesCollection(data.notes);
      } else {
        setError(data.message || "Failed to fetch notes");
      }
      setLoading(false);
    })
    .catch((error) => {
      setError("Something went wrong");
      setLoading(false);
    });
  }, [authToken]);

  if (loading) {
    return <Loader />;

  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className={styles.container}>
      <Greeting />
      <main>
        <Note text="Create New Note..." date={Now} color="var(--opaque-light-cyan)" />
        {notesCollection.map((note) => (
          <Note key={note._id} _id={note._id} text={note.text} date={note.createdAt} color={note.color} />
        ))}
      </main>
    </section>
  );
}

export default Wrapper(Notes);
