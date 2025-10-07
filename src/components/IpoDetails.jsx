import React from "react";
import { useParams, Link } from "react-router-dom";
import { ipoData } from "../data/ipoData";
import NavigationBar from "./NavigationBar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./IpoDetails.css";
import { FiDownload } from "react-icons/fi";

const IpoDetails = () => {
  const { id } = useParams();
  const ipo = ipoData.find((i) => i.id === parseInt(id));

  if (!ipo) return <h2>IPO not found</h2>;

  // Function to handle PDF download
  const handleDownloadPDF = () => {
    const page = document.querySelector(".ipo-details-page");

    // Temporarily hide navigation and buttons
    document.body.classList.add("pdf-mode");

    html2canvas(page, { scale: 2, scrollY: -window.scrollY }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${ipo.name}_Details.pdf`);

      // Restore normal view
      document.body.classList.remove("pdf-mode");
    });
  };

  return (
    <div className="ipo-details-page">
      <NavigationBar />

      <header className="ipo-header">
        <Link to="/" className="back-btn">
          ←
        </Link>
        <div className="ipo-header-info">
          <img src={ipo.logo} alt={ipo.name} className="detail-logo" />
          <div>
            <h2>{ipo.name}</h2>
            <p>{ipo.name} Private Limited</p>
          </div>
        </div>
        <div className="button-group">
          <FiDownload
            className="download-icon"
            size={24}
            onClick={handleDownloadPDF}
            style={{ cursor: "pointer", color: "#007bff" }}
          />

          <button className="py-3 apply-btn">Apply Now</button>
        </div>
      </header>

      <section className="ipo-details-section">
        <h3>IPO Details</h3>
        <div className="ipo-details-card">
          <div className="ipo-detail-item">
            <h4>Issue size</h4>
            <p>{ipo.issueSize}</p>
          </div>
          <div className="ipo-detail-item">
            <h4>Price range</h4>
            <p>{ipo.priceRange}</p>
          </div>
          <div className="ipo-detail-item">
            <h4>Minimum amount</h4>
            <p>{ipo.minInvest}</p>
          </div>
          <div className="ipo-detail-item">
            <h4>Lot size</h4>
            <p>
              <strong>{ipo.qty}</strong>
            </p>
          </div>
          <div className="ipo-detail-item">
            <h4>Issue dates</h4>
            <p>
              <strong>{ipo.issueDate}</strong>
            </p>
          </div>
          <div className="ipo-detail-item">
            <h4>Listed on</h4>
            <p>
              <strong>{ipo.listedOn}</strong>
            </p>
          </div>
          <div className="ipo-detail-item">
            <h4>Listed price</h4>
            <p>
              <strong>{ipo.listedPrice}</strong>
            </p>
          </div>
          <div className="ipo-detail-item">
            <h4>Listing gains</h4>
            <p>
              {ipo.listingGainValue}{" "}
              <span
                className={
                  ipo.listingGainPercent.startsWith("-") ? "negative" : ""
                }
              >
                ({ipo.listingGainPercent})
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="ipo-timeline">
        <h3>IPO Timeline</h3>
        <div className="timeline-container">
          {[
            { label: "Bidding starts", date: "12 Dec 2023" },
            { label: "Bidding ends", date: "15 Dec 2023" },
            { label: "Allotment finalization", date: "18 Dec 2023" },
            { label: "Refund initiation", date: "18 Dec 2023" },
            { label: "Demat transfer", date: "18 Dec 2023" },
            { label: "Listing date", date: "21 Dec 2023" },
          ].map((step, index, arr) => {
            // Mark completed, active, and upcoming steps
            const activeStep = 6; // This can be change this value dynamically later
            const status =
              index < activeStep
                ? "completed"
                : index === activeStep
                ? "active"
                : "upcoming";

            return (
              <div key={index} className={`timeline-step ${status}`}>
                <div className="timeline-icon">
                  {status === "completed" ? "✔" : ""}
                </div>
                <p className="step-label">{step.label}</p>
                <small className="step-date">{step.date}</small>

                {/* Connector line except last one */}
                {index !== arr.length - 1 && (
                  <div className={`timeline-line ${status}`}></div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="about-company">
        <h3>About the company</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
          doloremque rerum! Dolor possimus reprehenderit, ex fugiat ullam sit
          molestias, cumque harum dolorum voluptas saepe dignissimos illum
          labore voluptate modi iusto.
        </p>
      </section>
    </div>
  );
};

export default IpoDetails;
