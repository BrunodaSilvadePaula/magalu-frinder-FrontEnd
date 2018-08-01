import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap.min.js'

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
