import { Scanner } from '@yudiel/react-qr-scanner';
import { useState } from "react";

const ReactQRScanner = () => {
    const [qrData, setQrData] = useState("");
    return (
        <div>
            <p>Scan your badge here.</p>
            <Scanner 
                onScan={(result) => {
                setQrData(result);
                console.log(result)
            }} 
                onError={(err)=>{
                   console.log("error on scanning:", err) 
                }}
                sound= { true}
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