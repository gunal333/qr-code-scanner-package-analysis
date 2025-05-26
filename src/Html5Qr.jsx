import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

const Html5Qr = () => {
  const [decodedText, setDecodedText] = useState("");
  const [html5QrCode, setHtml5QrCode] = useState(null);
  const startScanner = () => {
    const html5QrCode = new Html5Qrcode(/* element id */ "reader");
    html5QrCode
      .start(
        { facingMode: "environment" }, // Use the rear camera if available
        {
          fps: 10, // Optional, frame per seconds for qr code scanning
          qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
          setDecodedText(decodedText); // Update the state with the scanned result
          console.log(decodedText, decodedResult); // Handle the decoded QR code text
          // do something when code is read
        },
        (errorMessage) => {
          // parse error, ignore it.
        }
      )
      .catch((err) => {
        // Start failed, handle it.
      });
    setHtml5QrCode(html5QrCode); // Store the instance for later use
  };

  const zoomIn = () => {
    const zoom  = html5QrCode.getRunningTrackCameraCapabilities()
        console.log(zoom);
    if (html5QrCode != null) {
      html5QrCode.applyVideoConstraints({
        advanced: [{ zoom: 10 }],
      });
    }
  };

  const zoomOut = () => {
    if (html5QrCode != null) {
      html5QrCode.applyVideoConstraints({
        advanced: [{ zoom: 10 }],
      });
    }
  };

  return (
    <div>
      <p>Scan your badge here.</p>
      <button onClick={startScanner}>Start Scanner</button>
      <button onClick={zoomIn}>Zoom in</button>
      <button onClick={zoomOut}>Zoom in</button>
      <div
        id="reader"
        style={{ width: "100%", height: "100%", border: "2px solid red" }}
      ></div>
      <div>{decodedText}</div>
    </div>
  );
};

export default Html5Qr;
