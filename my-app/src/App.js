import React, { useState, useEffect, useRef } from 'react';

import './App.css';
import QRCode from "react-qr-code";

function App() {
  const [pageid, setPageId] = useState(0);

  const redirectToQr = () => {
    setPageId(1);
  }

  const goBack = () => {
    setPageId(0);
  }

  const redirectToAttendance = () => {
    setPageId(2)
  }

  return (
    <div className="App">
      {pageid === 0 ? (
        renderHome()
      ) : pageid === 2 ? (
        <AttendancePage onBack={goBack} />
      ) :
      (
        <QR onBack={goBack} />
      )}
    </div>
  );

  function renderHome() {
    return <div className="mac-book-air-1">
      <div className="line-1"></div>
      <button className="frame-1" onClick={redirectToAttendance}>
        <div className="upload-video">Attendance</div>
      </button>
      <button className="frame-2" onClick={redirectToQr}>
        <div className="camera-feed">Generate QR</div>
      </button>
      <div className="select-video-type">Smart Attendance System</div>
    </div>;
  }
}

function AttendancePage({ onBack }) {
  return (
    <div>
      <h1>Attendance Page</h1>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

function QR({ onBack }) {
  const handleClick = async () => {
    console.log("downloading")
    // Add code to send a request to run your Node.js script here
    // You can use Axios, fetch, or any HTTP client library to send a request.
    // For example, using fetch:
    try {
      const response = await fetch('http://localhost:3000/run-node-script', {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Node.js script executed successfully.');
      } else {
        console.error('Error running Node.js script.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  const [qrValue, setQRValue] = useState("SRS" + Date.now());

  useEffect(() => {
    // Create an interval that updates the QR code value every 3 seconds
    const interval = setInterval(() => {
      setQRValue("SRS+" + Date.now());
    }, 3000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="backQr">
      <h1>QR code</h1>

      <QRCode
        value={qrValue}
        style={{ height: "auto", maxWidth: "30%", width: "30%" }}
      />

      <br />
      <button onClick={onBack}>Back</button>
      <button onClick={handleClick}>download</button>

    </div>
  );
}

export default App;
