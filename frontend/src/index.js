import React from "react";
import ReactDOM from "react-dom/client";
import "./../src/assets/styles/global.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { EthersContextProvider } from "./context/ethers-context";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { ChildContextProvider } from "./context/child-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <EthersContextProvider>
                <ChildContextProvider>
                    <App />
                </ChildContextProvider>
            </EthersContextProvider>
        </BrowserRouter>
    </React.StrictMode>
);
