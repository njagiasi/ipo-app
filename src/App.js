import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IpoList from "./components/IpoList";
import IpoDetails from "./components/IpoDetails";
import "@fontsource/sora";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IpoList />} />
        <Route path="/ipo/:id" element={<IpoDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
