//import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import './App.css';
import { DungeonsOfOregoa } from './pages/DungeonsOfOregoa';
import { Blog } from "./pages/Blog";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />

          <Route path="blog" element={<Blog/>} />

          <Route path="dungeons-of-oregoa" element={<DungeonsOfOregoa />} />

          <Route path="*" element={<NoPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;