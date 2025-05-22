import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

const Html5Qr = () => {
    const [decodedText,setDecodedText] = useState("");
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
            console.log(decodedText,decodedResult); // Handle the decoded QR code text
            // do something when code is read
          },
          (errorMessage) => {
            // parse error, ignore it.
          }
        )
        .catch((err) => {
          // Start failed, handle it.
        });
  }

  return (
    <div>
      <p>Scan your badge here.</p>
      <button onClick={startScanner}>Start Scanner</button>
      <div id="reader" style={{ width: "100%", maxHeight: "400px" }}></div>
      <div>{decodedText}</div>
    </div>
  );
};

export default Html5Qr;
