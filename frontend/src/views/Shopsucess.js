import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../CSS/ware.css';

const Success = () => {
    return (
        <div class="d-flex flex-column min-vh-100">
            <nav class="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/"><img class="warelogo" src="images/Logos/logo.png" alt="Ware Logo" /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
                    <a href="/login">
                        <button class="btn btn-outline-light me-2" type="button">
                            Iniciar Sessão
                        </button>
                    </a>
                </div>
            </nav>

            <div class="main-content d-flex justify-content-center align-items-center flex-grow-1">
                <div class="success-container">
                    <i class="fas fa-check-circle fa-5x mb-4"></i>
                    <h1>Sucesso!</h1>
                    <p>Foi enviado um email para email@domain.com a confirmar a compra!</p>
                    <a href="/library" class="btn btn-primary">Ir para Os Meus Softwares</a>
                </div>
            </div>

            
            <footer class="footer bg-dark text-light">
                <div class="container d-flex justify-content-center align-items-center">
                    <span class="text-center">&copy; Ware 2024</span>
                 </div>
             </footer>
        </div>
    );
};

export default Success;
