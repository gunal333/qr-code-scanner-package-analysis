import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";

const Html5Qr = () => {
  const [decodedText, setDecodedText] = useState("");
  const [html5QrCode, setHtml5QrCode] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(1);
  const [torch, setTorch] = useState(false);
  const [facingMode, setFacingMode] = useState("environment");
  const [pause, setPause] = useState(false);
  
  useEffect(()=>{
    if(html5QrCode!=null){
      startScanner();
    }
  },[facingMode])
  const startScanner = () => {
    const html5QrCode = new Html5Qrcode(/* element id */ "reader");
    html5QrCode
      .start(
        { facingMode: facingMode }, // Use the rear camera if available
        {
          fps: 10, // Optional, frame per seconds for qr code scanning
          qrbox: { width: 250, height: 250 }, // Optional, if you want bounded box UI
          // videoConstraints: {
          //   facingMode: facingMode,
          // },
        },
        (decodedText, decodedResult) => {
          setDecodedText(decodedText); // Update the state with the scanned result
          console.log(decodedText, decodedResult); // Handle the decoded QR code text
          // do something when code is read
            if(decodedText.includes("1234")){
                navigator.vibrate(100)
            }
            else{
                navigator.vibrate([100, 50, 100])
            }
        },
        (errorMessage) => {
          // parse error, ignore it.
        }
      )
      .catch((err) => {
        // Start failed, handle it.
        console.log("start failed:", err);
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
    console.log("Zooming out to:", newZoom, maxZoom);
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
    console.log("Zooming out to:", newZoom, minZoom);
    if (html5QrCode != null && newZoom >= minZoom) {
      html5QrCode.applyVideoConstraints({
        advanced: [{ zoom:newZoom }],
      });
      setCurrentZoom(newZoom);
    }
  };

  const toggleCamera = () => {
    let camCapabilities = html5QrCode.getRunningTrackCapabilities()
    console.log("facing mode",facingMode);
    console.log("camCapabilities",JSON.stringify(camCapabilities));
    
    if (html5QrCode) {
      if (facingMode === "environment") {
        setFacingMode("user");
      }
      else {
        setFacingMode("environment");
      }
      html5QrCode.stop()
          .then(() => {
            return html5QrCode.clear();
          })
          .then(() => {
            console.log("Scanner stopped and cleared.");
          })
          .catch(err => {
            console.error("Error stopping scanner: " + err);
          });
    }
  }

    const toggleTorch = () => {
        const torchFeature = html5QrCode.getRunningTrackCameraCapabilities().torchFeature();
        if (!torchFeature) {
            console.log("torch is not supported");
            return;
        }
        html5QrCode.applyVideoConstraints({
            torch: !torch,
            advanced: [{torch: !torch}]
        });
        setTorch(!torch);
    }
    
    const pauseScan = () => {
      if(html5QrCode){
          if(!pause){
              html5QrCode.pause(!pause);
          }
          else{
              html5QrCode.resume()
          }
          setPause(!pause);
      }
    }

  return (
    <div>
      <p>Scan your badge here.</p>
      <button onClick={startScanner}>Start Scanner</button>
      <button onClick={zoomIn}>Zoom in</button>
      <button onClick={zoomOut}>Zoom out</button>
      <button onClick={toggleCamera}>Toggle camera</button>
      <button onClick={toggleTorch}>Torch</button>
      <button onClick={pauseScan}>Pause</button>
      <div
        id="reader"
        style={{ width: "100%", height: "100%", border: "2px solid red" }}
      ></div>
      <div>{decodedText}</div>
    </div>
  );
};

export default Html5Qr;
