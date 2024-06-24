import axios from 'axios';
import React, { useState } from "react";

export default function Sign_tipo() {
    return (
        <div style={{
            backgroundImage: `url('/images/fundos/fundotipodeconta.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            height: '103vh',
            width: '99vw'
        }}>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={'/images/Logos/logo.png'} style={{ width: '20%' }} alt="Ware Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    </div>
                    <a className="btn btn-outline-light me-2" href="/home" role="button">Iniciar Sessão</a>

                </div>
            </nav>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "95vh" }}>
                <div className="card text-center mb-3 align-middle" style={{ width: '20rem', border: 'none', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: '20px' }}>

                    <div className="card-body" style={{ textAlign: "center", marginTop: "5%", backgroundcolor: 'white' }}>
                        <h2 className="card-title" style={{ marginBottom: "10%" }}>Gestor</h2>
                        <p className="card-text" style={{ lineHeight: "3" }}>
                            <ul style={{ listStyle: "none", padding: "0", textAlign: "center" }}>
                                <li><i className="fas fa-check"></i> Biblioteca de Softwares</li>
                                <li><i className="fas fa-check"></i> Gestão Empresarial</li>
                                <li><i className="fas fa-times"></i> Compra de Softwares</li>
                            </ul>
                        </p>
                        <a href="/signin/gestor" className="btn btn-dark" style={{ marginTop: "5%" }}>Selecionar</a>
                    </div>
                </div>
                <div className="card text-center mb-3 align-middle" style={{ width: '20rem', border: 'none', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: "5rem", backgroundColor: 'white', padding: '5px' }}>
                    <div className="card-body" style={{ textAlign: 'center', marginTop: '20%', backgroundColor: 'white' }}>
                        <h2 className="card-title" style={{ marginTop: '-20%' }}>Comprador/</h2>
                        <h2 className="card-title" style={{ marginBottom: '5%' }}>Gestor</h2>
                        <p className="card-text" style={{ lineHeight: '3' }}>
                            <ul style={{ listStyle: 'none', padding: '0', textAlign: 'center' }}>
                                <li><i className="fas fa-check"></i> Biblioteca de Softwares</li>
                                <li><i className="fas fa-check"></i> Gestão Empresarial</li>
                                <li><i className="fas fa-check"></i> Compra de Softwares</li>
                            </ul>
                        </p>
                        <a href="/signin/c_gestor" className="btn btn-dark" style={{ marginTop: '1%' }}>Selecionar</a>
                    </div>
                </div>
            </div>
            <footer class="footer bg-dark text-light fixed-bottom">
                <div class="container d-flex justify-content-center align-items-center">
                    <span class="text-center">&copy; Ware 2024</span>
                 </div>
             </footer>
        </div>
    );
}
