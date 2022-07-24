import React from 'react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import './bootstrap/lux-bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

const REACT_VERSION = React.version;

root.render(
  <React.StrictMode>
    <App />
    <div>React version: {REACT_VERSION}</div>,
  </React.StrictMode>,
  //document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
