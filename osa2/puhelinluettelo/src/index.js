import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';

import axios from 'axios'

axios.get('https://sleepy-savannah-67769.herokuapp.com/api/persons').then(res => {
    const persons = res.data
    ReactDOM.render(
        <App persons={persons} />,
        document.getElementById('root')
    )
})
