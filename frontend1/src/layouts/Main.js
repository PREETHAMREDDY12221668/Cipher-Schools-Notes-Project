import React, { Suspense, useEffect } from 'react'
import Loader from '../components/shared/loader'
import styles  from './layout.module.scss'
import { Outlet, useNavigate } from 'react-router-dom'
import SideBar from '../components/shared/side-bar'
import utils from'../utils/localstorage';
import Navbar from '../components/shared/navbar';
import { ToastContainer } from "react-toastify";



function Main() {
  const navigate=useNavigate();
  useEffect(()=>{
    const AuthKey=utils.getFromLocalStorage("auth_key");
    if(!AuthKey){
      navigate("/");
    }
  },[navigate]);

  return (
      <main className={styles.container}>
      <ToastContainer/>
      <Suspense fallback={<Loader />}>
        {/* SideBar */}
        <SideBar/>
        <div className={styles.main}>
          {/*navbar */}
          <Navbar />
            {/*navBar */}
            <section className={styles.contents}>
                <Outlet />
            </section>

          </div>
        </Suspense>
    </main>
  );
}

export default Main