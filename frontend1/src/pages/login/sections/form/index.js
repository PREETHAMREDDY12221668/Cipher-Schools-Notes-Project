import React, { useState } from "react";
import styles from "./form.module.scss";
import BrandLogo from "../../../../components/shared/brand";
import Signup from "../../partials/signup.js";
import Signin from "../../partials/signin.js";

function Form(){
    
    const [active,setActive]=useState('signin');

    return (
        <section className={styles["form-container"]}>
            <BrandLogo />
            {active === "signin" ?<Signin />: <Signup  handleSwitch={()=>setActive("signin")}/>}
            {active ==="signin" ? <p>
                Not yet registered ? <span onClick={()=> setActive("signup")}>Sign Up Now</span> 
            </p>:
            <p>
            Already registered ? <span onClick={()=> setActive("signin")}>Sign In Now</span> 
        </p>
            }
        </section> 
    )
}

export default Form