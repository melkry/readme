import React from 'react';
import ReactDOM from 'react-dom/client';
import NavBar from './components/navBar/navBar';
import Portal from './components/portal/portal';
import Footer from './components/footer/footer';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar />
    <Portal />
    <Footer />
  </React.StrictMode>
);
