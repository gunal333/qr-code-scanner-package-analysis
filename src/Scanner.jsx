import QrScanner from "qr-scanner";
import { useEffect, useRef, useState } from "react";

const Scanner = () => {
    const videoRef = useRef(null); // Reference to the video element
    const [qrResult, setQrResult] = useState(""); // State to store the scanned QR code result

    useEffect(() => {
        const videoElem = videoRef.current;

        if (videoElem) {
            const qrScanner = new QrScanner(
                videoElem,
                (result) => {
                    console.log("Decoded QR code:", result);
                    setQrResult(result); // Update the state with the scanned result
                },
                { highlightScanRegion: true } // Optional: Highlight the scan region
            );

            qrScanner.start().catch((err) => console.error("Failed to start QR scanner:", err));

            return () => {
                qrScanner.stop(); // Stop the scanner when the component unmounts
            };
        }
    }, []);

    return (
        <div>
            <p>Scan your badge here.</p>
            <video ref={videoRef} style={{ width: "100%", maxHeight: "400px" }}></video>
            {qrResult && (
                <div>
                    <h2>Scanned QR Code:</h2>
                    <p>{qrResult.data}</p>
                </div>
            )}
        </div>
    );
};

export default Scanner;