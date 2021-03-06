import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import "./i18nextConfig";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";
import { UserContextProvider } from "./context/userContext";

import Favicon from "./assets/waysbucks.png";
const favicon = document.getElementById("idFavicon");
favicon.setAttribute("href", Favicon);

const options = {
  position: positions.BOTTOM_LEFT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
};

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<span>Loading...</span>}>
      <UserContextProvider>
        <Router>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </Router>
      </UserContextProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
