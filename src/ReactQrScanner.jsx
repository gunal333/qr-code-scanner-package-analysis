import {Scanner} from '@yudiel/react-qr-scanner';
import {useState} from "react";

const ReactQRScanner = () => {
    const [qrData, setQrData] = useState("");
    const [facingMode, setFacingMode] = useState("environment"); // Default to rear camera
    const [torch, setTorch] = useState(false); // Default to torch off
    const [pause, setPause] = useState(false); // Default to pause off

    const toggleCamera = () => {
        setFacingMode(facingMode === "environment" ? "user" : "environment");
    };

    const toggleTorch = () => {
        setTorch(!torch);
    };
    const onPause = () => {
        if (pause) {
            setPause(!pause)
        }
        console.log("Scanning paused");
    };
    return (
        <div>
            <p>Scan your badge here.</p>
            <button onClick={onPause}>pause scanning</button>
            <button onClick={toggleCamera}>Toggle Camera</button>
            <button onClick={toggleTorch}>Toggle Torch</button>
            <Scanner
                onScan={(result) => {
                    setQrData(result[0].rawValue);
                    console.log(result);
                }}
                onError={(err) => {
                    console.log("error on scanning:", err);
                }}
                sound={true}
                constraints={{
                    facingMode: facingMode // Use the rear camera by default
                }}
                components={{
                    zoom: true,
                    torch: torch,
                }}
                paused={pause}
            />
            {qrData && (
                <div>
                    <h2>Scanned QR Code:</h2>
                    <p>{qrData}</p>
                </div>
            )}
        </div>
    );
};

export default ReactQRScanner;