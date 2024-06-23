import axios from 'axios';
import React, { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Sign_tipo() {
    return (
        <div style={{
            backgroundImage: `url('/images/fundos/fundotipodeconta.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            height: '100vh',
            width: '100vw'
        }}>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={'public/images/Logos/logotipo.png'} style={{ width: '20%' }} alt="Ware Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    </div>
                    <button className="btn btn-outline-light me-2" type="button">Iniciar Sessão</button>
                </div>
            </nav>
            <div className="d-flex justify-content-center align-items-center" style={{height: "95vh" }}>
                <div className="card text-center mb-3 align-middle" style={{ width: '20rem', border: 'none', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <div className="card-body" style={{ textAlign: "center", marginTop: "20%" }}>
                        <h2 className="card-title" style={{ marginBottom: "45px" }}>Gestor</h2>
                        <p className="card-text" style={{ lineHeight: "3" }}>
                            <ul style={{ listStyle: "none", padding: "0", textAlign: "left" }}>
                                <li><i className="fas fa-check"></i> Biblioteca de Softwares</li>
                                <li><i className="fas fa-check"></i> Gestão Empresarial</li>
                                <li><i className="fas fa-times"></i> Compra de Softwares</li>
                            </ul>
                        </p>
                        <a href="#" className="btn btn-dark" style={{ marginTop: "35px" }}>Selecionar</a>
                    </div>
                </div>
                <div className="card text-center mb-3 align-middle" style={{ width: '20rem', border: 'none', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: "5rem" }}>
                    <div className="card-body" style={{ textAlign: 'center', marginTop: '20%' }}>
                        <h2 className="card-title" style={{ marginBottom: '-5px' }}>Comprador/</h2>
                        <h2 className="card-title" style={{ marginBottom: '20px' }}>Gestor</h2>
                        <p className="card-text" style={{ lineHeight: '3' }}>
                            <ul style={{ listStyle: 'none', padding: '0', textAlign: 'left' }}>
                                <li><i className="fas fa-check"></i> Biblioteca de Softwares</li>
                                <li><i className="fas fa-check"></i> Gestão Empresarial</li>
                                <li><i className="fas fa-check"></i> Compra de Softwares</li>
                            </ul>
                        </p>
                        <a href="#" className="btn btn-dark" style={{ marginTop: '20px' }}>Selecionar</a>
                    </div>
                </div>
            </div>
            <footer className="footer fixed-bottom bg-dark text-light text-center">
                <div className="container">
                    <span>&copy; Ware 2024</span>
                </div>
            </footer>
        </div>
    );
}
