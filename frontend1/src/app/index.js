import React from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Login from "../pages/login";
import Loader from "../components/shared/loader";
import Main from "../layouts/Main";
import Notes from "../pages/notes";

function App() {
    return (
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/loading" element={<Loader />} />
            <Route path="/notes" element={<Main />}>
              <Route index element={<Notes />} />
            </Route>
          </Routes>
      </BrowserRouter>
    );
  }
  
  export default App;
  