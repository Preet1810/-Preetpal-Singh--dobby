import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import axios from "axios"

import Navbar from "../src/components/Navbar"
import LoginPage from "../src/components/auth/index"
import PostImage from "./components/PostImage"
import Images from '../src/components/Images';
import { useSelector } from "react-redux";
axios.defaults.withCredentials=true;

const App=() => {
  const isAuth=Boolean(useSelector((state) => state.token))
  return (
    <BrowserRouter>
      {isAuth? <Navbar />:<LoginPage />}
      <Routes>
        {isAuth? (
          <>
            <Route path="/" element={<Images />} />
            <Route path="/create" element={<PostImage />} />
          </>
        ):null}
      </Routes>
    </BrowserRouter>
  )
}

export default App