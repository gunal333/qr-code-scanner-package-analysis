import QrScanner from "qr-scanner";
import {useEffect, useRef, useState} from "react";
import Zoom from "./Zoom.jsx";

const QRScanner = () => {
    const videoRef = useRef(null); // Reference to the video element
    const [qrResult, setQrResult] = useState(""); // State to store the scanned QR code result
    const [camera, setCamera] = useState("environment"); // State to manage camera selection
    const [isPaused, setIsPaused] = useState(false); // State to manage pause state
    const [qrScannerInstance, setQrScannerInstance] = useState(null); // State to manage the QR scanner instance
    const [capabilities, setCapabilities] = useState({
        zoom: {
            min: 1,
            max: 1,
            step: 1
        }
    }); // State to manage the QR scanner instance
    const [settings, setSettings] = useState({
        zoom: 1
    }); // State to manage the QR scanner instance
    const [videoTrack, setVideoTrack] = useState(null); // State to manage the QR scanner instance

    useEffect(() => {
        const videoElem = videoRef.current;

        if (videoElem) {
            const qrScanner = new QrScanner(
                videoElem,
                (result) => {
                    console.log("Decoded QR code:", result);
                    setQrResult(result); // Update the state with the scanned result
                },
                {highlightScanRegion: true} // Optional: Highlight the scan region
            );
            qrScanner.turnFlashOn();
            qrScanner.start().catch((err) => console.error("Failed to start QR scanner:", err));
            qrScanner.setCamera("environment"); // Use the rear camera if available
            setQrScannerInstance(qrScanner); // Store the QR scanner instance in state
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: true
            }).then((stream) => {
                console.log("Stream:", stream);
                let vt = stream.getVideoTracks()[0];
                console.log("cap:", vt.getCapabilities());
                console.log("settings:", vt.getSettings());
                setCapabilities({...capabilities, ...vt.getCapabilities()});
                setSettings({...settings, ...vt.getSettings()});
                setVideoTrack(vt);
            }).catch((err) => {
                console.error("Error accessing media devices:", err);
            });
            return () => {
                qrScanner.stop(); // Stop the scanner when the component unmounts
            };

        }
    }, []);

    useEffect(() => {
        if (qrScannerInstance) {
            qrScannerInstance.setCamera(camera); // Set the camera based on the state
        }
    }, [qrScannerInstance, camera]);

    const ToggleCamera = () => {
        if (camera === "user") {
            setCamera("environment");
        } else {
            setCamera("user");
        }
    }

    const PauseAndResumeCamera = () => {
        if (qrScannerInstance && !isPaused) {
            qrScannerInstance.$video.pause(); // Pause the video initially
            setIsPaused(true);
        } else if (qrScannerInstance && isPaused) {
            qrScannerInstance.$video.play();
            setIsPaused(false);
        }
    }

    return (
        <div>
            <p>Scan your badge here.</p>
            <button onClick={ToggleCamera}>Toggle camera</button>
            <button onClick={PauseAndResumeCamera}>Pause camera</button>

            <video ref={videoRef} style={{width: "100%", maxHeight: "400px"}}></video>
            {qrResult && (
                <div>
                    <h2>Scanned QR Code:</h2>
                    <p>{qrResult.data}</p>
                </div>
            )}
            <Zoom
                scanning={true}
                capabilities={capabilities.zoom}
                onZoom={(val) => {
                    const newConstraints = {
                        advanced: [{zoom: val}]
                    };
                    videoTrack.applyConstraints(newConstraints);
                }}
                value={settings.zoom}/>
        </div>
    );
};

export default QRScanner;