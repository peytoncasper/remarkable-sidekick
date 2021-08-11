import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './App';

import "./static/css/index.css";
import {RecoilRoot} from "recoil";

// import reportWebVitals from './reportWebVitals';
ReactDOM.render(
    <RecoilRoot>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </RecoilRoot>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

