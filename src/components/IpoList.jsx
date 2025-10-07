import React from "react";
import { Link } from "react-router-dom";
import { ipoData } from "../data/ipoData";
import NavigationBar from "./NavigationBar";
import "./IpoList.css";

const IpoList = () => {
  return (
    <div className="ipo-list-page">
      <NavigationBar />
      <h2>IPO List</h2>
      <table className="ipo-table">
        <thead>
          <tr>
            <th>Company / Issue date</th>
            <th>Issue size</th>
            <th>Price range</th>
            <th>Min invest/qty</th>
          </tr>
        </thead>
        <tbody>
          {ipoData.map((ipo) => (
            <tr key={ipo.id}>
              <td>
                <div className="company-cell">
                  <img src={ipo.logo} alt={ipo.name} className="company-logo" />
                  <div>
                    <Link to={`/ipo/${ipo.id}`} className="company-name">
                      {ipo.name}
                    </Link>
                    <p className="issue-date">{ipo.issueDate}</p>
                  </div>
                </div>
              </td>
              <td>{ipo.issueSize}</td>
              <td>{ipo.priceRange}</td>
              <td>
                <b>{ipo.minInvest}</b>
                <p>{ipo.qty}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IpoList;
