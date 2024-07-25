import React, { useState } from "react";
import Button from '../../../components/atoms/button';
import { useNavigate } from "react-router-dom";
import Input from "../../../components/atoms/input";
import styles from './partials.module.scss' 
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import utils from '../../../utils/localstorage'


function Signin() {
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate= useNavigate()
    const handleLogin =()=>{
        //logic for login
        if (!email.length || !password.length) {
            toast.error("Some Required fields are missing");
            return;
          }
        fetch("http://localhost:3001/api/users/signin",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log({data});
    if(data?.success===200){
        toast.success("User logged in successfully") ;
        navigate('/notes');
        utils.addToLocalStorage('auth_key',data.token)
    }
    else toast.error(data?.message);

    })
    .catch(error=>{
        console.log({error});
        toast.error("User login failed!")
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
                handleclick={handleLogin}
                />
            </div>
  )
}

export default Signin