import React from "react";
import ReactDOM from "react-dom/client";
import "./../src/assets/styles/global.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { EthersContextProvider } from "./context/ethers-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <EthersContextProvider>
                <App />
            </EthersContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
