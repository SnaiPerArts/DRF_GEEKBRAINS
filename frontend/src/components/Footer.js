import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
    return (
        <footer className='footer-copyright fixed-bottom text-center bg-dark bg-opacity-25 py-3'>
            Product by Denis Prusakov - {new Date().getFullYear()}
        </footer>
    )
}

export default Footer