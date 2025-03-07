import "./index.css";
// import React, { useState, useEffect } from "react";
import { Routes, Route} from "react-router-dom";


// Pages
import Home from "./Pages/Home/Home";
import About from "./Pages/Home/About";
import Projects from "./Pages/Home/Project";
import Prim from './Pages/Home/sevenPrimitiveNonPrimitive'

function App() {

  return (
    <>
      <button onClick={() => window.location.href = "/"}>Home</button>
      <Routes>
        {/* Static Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />        
        <Route path="/prim" element={<Prim />} />        
      </Routes>
    </>
  );
}

export default App;



// function App() {

//   return (
//     <>
//       <h1
//         className="text-3xl text-center text-red-700"
//       >Welcome to Vite with TailwindCSS and React</h1>
//     </>
//   )
// }

// export default App
