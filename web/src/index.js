import React from 'react';
import { render } from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'jquery/dist/jquery.slim'
import 'popper.js'
import 'bootstrap/dist/js/bootstrap.min'
import './assets/css/sb-admin-2.min.css'
import './index.css';

import App from './App';
import { Router } from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store'
import * as helpers from './modules/helpers'
import reportWebVitals from './reportWebVitals';


render(
    <Provider store={store}>
        <Router history={helpers.history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();