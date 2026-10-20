import React from 'react';import ReactDOM from 'react-dom/client';import {BrowserRouter} from 'react-router-dom';import App from './App';
import './styles.css';
import './auth-admin.css';
import './login-pending.css';
import './systems-admin.css';
import './systems-schedules.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><BrowserRouter><App/></BrowserRouter></React.StrictMode>);
