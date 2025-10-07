import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavigationBar.css";
import { ipoData } from "../data/ipoData";

const NavigationBar = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  // If we're on a detail page like /ipo/3, show IPO name at end
  
  const isDetailPage = pathParts.length === 2;

  
const ipo = ipoData.find((i) => i.id === parseInt(pathParts[1]));
const ipoName = ipo ? ipo.name : "";

  return (
    <div className="breadcrumb">
      <Link to="/" className="crumb">Home</Link>
      <span className="divider">›</span>
      <span className="crumb">Market Watch</span>

      {isDetailPage && (
        <>
          <span className="divider">›</span>
          <span className="crumb active">{ipoName.toUpperCase()}</span>
        </>
      )}
    </div>
  );
};

export default NavigationBar;
