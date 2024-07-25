import React, { useState } from "react";
import Button from '../../../components/atoms/button';

import Input from "../../../components/atoms/input/index.js";
import styles from './partials.module.scss' ;

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup(props) {
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const[password,setPassword]=useState('');
    const handleSingnUp=()=>{
        //logic for signup
        if (!email.length && !password.length && !name.length) {
            toast.error("Some Required fields are missing");
            return;
          }
        fetch("http://localhost:3001/api/users/signup",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                name,
                password
            })
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log({data});
    if(data?.success===201){
        toast.success("User signed up successfully") ;
        props.handleSwitch();
    }
    else toast.error(data.message);

    })
    .catch(error=>{
        console.log(error);
        toast.error("something went wrong")
    })
};
  return (
    <div className={styles.form}>
                <Button 
                text="Join with google"
                icon="ri:google-fill"
                className={styles.google}
                />
                <div className={styles.options}>
                    <span>or join with Email address and Password</span>
                </div>
                <article className={styles.details}>
                    <Input 
                        title="Email"
                        type="email"
                        value={email}
                        placeholder={ "Type your Email"}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <Input 
                        title="Full Name"
                        type="name"
                        value={name}
                        placeholder={ "Full Name"}
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                    <Input 
                         title="Password"
                        type="password"
                        value={password}
                        placeholder={ "Type your Password" }
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />
                </article>
                <Button 
                text="Join with Email"
                icon="material-symbols:login"
                className={styles.EmailBtn}
                handleclick={handleSingnUp}
                />
            </div>
  )
}

export default Signup;