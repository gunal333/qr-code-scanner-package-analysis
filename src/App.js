import './App.css';
import ReactQRScanner from "./ReactQrScanner.jsx";
import Home from "./Home.jsx";
import Html5Qr from "./Html5Qr.jsx";
import QRScanner from "./QrScanner.jsx";
import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>} />
                <Route path={"/html5-qr"} element={<Html5Qr />} />
                <Route path={"/qr-scanner"} element={<QRScanner />} />
                <Route path={"/react-qr-scanner"} element={<ReactQRScanner />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
