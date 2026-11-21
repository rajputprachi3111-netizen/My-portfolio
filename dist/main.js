import { jsx as _jsx } from "https://esm.sh/react@18.3.1/jsx-runtime";
import React from 'https://esm.sh/react@18.3.1';
import ReactDOM from 'https://esm.sh/react-dom@18.3.1/client';
import App from './App.js';
import './index.css';
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(_jsx(React.StrictMode, { children: _jsx(App, {}) }));
}
