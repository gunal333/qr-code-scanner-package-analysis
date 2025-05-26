import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

const Html5Qr = () => {
  const [decodedText, setDecodedText] = useState("");
  const [html5QrCode, setHtml5QrCode] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(1);
  const [facingMode, setFacingMode] = useState("environment");
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
    const zoom  = html5QrCode.getRunningTrackCameraCapabilities().zoomFeature();
    if (zoom == null) {
      console.error("Zoom feature is not supported by the camera.");
      return;
    }
    const maxZoom = zoom.max();
    const newZoom = currentZoom + 1;
    if (html5QrCode != null && newZoom <= maxZoom) {
      html5QrCode.applyVideoConstraints({
        advanced: [{ zoom: newZoom }],
      });
      setCurrentZoom(newZoom);
    }
  };

  const zoomOut = () => {
    const zoom  = html5QrCode.getRunningTrackCameraCapabilities().zoomFeature();
    if (zoom == null) {
      console.error("Zoom feature is not supported by the camera.");
      return;
    }
    const minZoom = zoom.min();
    const newZoom = currentZoom - 1;
    if (html5QrCode != null && newZoom >= minZoom) {
      html5QrCode.applyVideoConstraints({
        advanced: [{ zoom:newZoom }],
      });
      setCurrentZoom(newZoom);
    }
  };

  const toggleCamera = () => {
    if (html5QrCode) {
      if (facingMode === "environment") {
        setFacingMode("user");
      }
      else {
        setFacingMode("environment");
      }
      html5QrCode.applyVideoConstraints({
        advanced: [{ facingMode: facingMode }],
      });
    }
  }

  return (
    <div>
      <p>Scan your badge here.</p>
      <button onClick={startScanner}>Start Scanner</button>
      <button onClick={zoomIn}>Zoom in</button>
      <button onClick={zoomOut}>Zoom out</button>
      <button onClick={toggleCamera}>Toggle camera</button>
      <div
        id="reader"
        style={{ width: "100%", height: "100%", border: "2px solid red" }}
      ></div>
      <div>{decodedText}</div>
    </div>
  );
};

export default Html5Qr;
