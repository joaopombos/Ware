import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './shopsucess.css';

const Success = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">
                        <img src="/images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
                    <button className="btn btn-outline-light me-2" type="button">Terminar Sessão</button>
                </div>
            </nav>

            <div className="main-content d-flex justify-content-center align-items-center flex-grow-1">
                <div className="success-container">
                    <i className="fas fa-check-circle fa-5x mb-4"></i>
                    <h1>Sucesso!</h1>
                    <p>Foi enviado um email para email@domain.com a confirmar a compra!</p>
                    <a href="#" className="btn btn-primary">Ir para Os Meus Softwares</a>
                </div>
            </div>

            <footer className="footer bg-dark text-light text-center p-3">
                <div className="container">
                    <span>&copy; Ware 2024</span>
                </div>
            </footer>
        </div>
    );
};

export default Success;
