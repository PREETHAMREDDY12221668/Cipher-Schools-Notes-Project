// import React, { useState, useEffect } from 'react';
// import styles from './note.module.scss';
// import formatDate from '../../../utils/formatDate';
// import Button from '../../atoms/button';

// import { useNavigate } from 'react-router-dom';
// import utils from '../../../utils/localstorage';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Note(props) {
//     const { text, date, color } = props;
//     const [expand, setExpand] = useState(false);
//     const [noteText, setNoteText] = useState(text || '');
//     const navigate = useNavigate();
//     const authToken = utils.getFromLocalStorage('auth_key');
    
//     const handleSave = () => {
        
//         if (!authToken) {
//             toast.error("Unauthorized access!");
//             return;
//         }
//         if (!noteText.length || noteText.split(' ').length < 2) {
//             toast.error("Note should contain at least two words");
//             return;
//         }
//         fetch("http://localhost:3001/api/notes", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 authorization: authToken,
//             },
//             body: JSON.stringify({
//                 text: noteText,
//                 color
//             })
//         })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log({ data });
//             if (data?.success===200) {
//                 toast.success("New note created successfully");
//             } else {
//                 toast.error(data?.message);
//             }
//         })
//         .catch(error => {
//             console.log({ error });
//             toast.error("Something went wrong");
//         });



//     };

    

//     return (
//         <article className={styles.container} style={{ backgroundColor: color }}>
           
//             <div className={`${styles.content}`}>
//                 {text === "Create New Note..."? (
//                     <textarea 
//                         value={noteText} 
//                         className={styles.textarea}
//                         onChange={(e) => setNoteText(e.target.value)}
//                     />
//                 ) : (
//                     <>
//                         <p className={`${expand ? styles.expanded : ""}`}>{text}</p>
//                         {text.length > 154 ? (
//                             <button onClick={() => setExpand(prev => !prev)}>
//                                 {expand ? "Read less" : "Read more"}
//                             </button>
//                         ) : null}
//                     </>
//                 )}
//             </div>
//             <footer className={styles.footer}>
//                 <div>
//                     {formatDate(date)}
//                 </div>
//                 {noteText==="Create New Note..." ? (
//                     <Button 
//                         text={'save'} 
//                         className={styles.saveBtn}
//                         handleclick={handleupdate}
//                     />
//                 ) : <Button 
//                 text={'Update'}  
//                 className={styles.saveBtn}
//                 handleclick={handleSave}
//             />}
//             </footer>
//         </article>
//     );
// }

// export default Note;


import React, { useState } from 'react';
import styles from './note.module.scss';
import formatDate from '../../../utils/formatDate';
import Button from '../../atoms/button';
import { useNavigate } from 'react-router-dom';
import utils from '../../../utils/localstorage';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Note(props) {
    const { _id, text, date, color } = props;
    const [expand, setExpand] = useState(false);
    const [noteText, setNoteText] = useState(text || '');
    const navigate = useNavigate();
    const authToken = utils.getFromLocalStorage('auth_key');

    const handleSave = () => {
        if (!authToken) {
            toast.error("Unauthorized access!");
            return;
        }
        if (!noteText.length || noteText.split(' ').length < 2) {
            toast.error("Note should contain at least two words");
            return;
        }

        const url = text === "Create New Note..."
            ? "http://localhost:3001/api/notes"
            : `http://localhost:3001/api/notes/${_id}`;
        const method = text === "Create New Note..." ? 'POST' : 'PATCH';

        fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                authorization: authToken,
            },
            body: JSON.stringify({
                text: noteText,
                color, 
                userId:_id ,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            console.log({ data });
            if (data?.success === 200) {
                toast.success(text === "Create New Note..." ? "New note created successfully" : "Note updated successfully");
                navigate('/notes'); // Optionally, navigate to the notes page after saving/updating
            } else {
                toast.error(data?.message);
            }
        })
        .catch(error => {
            console.log({ error });
            toast.error("Something went wrong");
        });
    };

    return (
        <article className={styles.container} style={{ backgroundColor: color }}>
            <div className={`${styles.content}`}>
                {text ? (
                    <textarea 
                        value={noteText} 
                        className={styles.textarea}
                        onChange={(e) => setNoteText(e.target.value)}
                    />
                ) : (
                    <>
                        <p className={`${expand ? styles.expanded : ""}`}>{noteText}</p>
                        {noteText.length > 154 ? (
                            <button onClick={() => setExpand(prev => !prev)}>
                                {expand ? "Read less" : "Read more"}
                            </button>
                        ) : null}
                    </>
                )}
            </div>
            <footer className={styles.footer}>
                <div>{formatDate(date)}</div>
                <Button 
                    text={text === "Create New Note..." ? 'Save' : 'Update'} 
                    className={styles.saveBtn}
                    handleclick={handleSave}
                />
            </footer>
        </article>
    );
}

export default Note;
