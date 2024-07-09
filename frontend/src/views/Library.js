// Library.js
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import '../CSS/ware.css';


const MySoftwares = () => {
    const [softwares, setSoftwares] = useState([]);

    useEffect(() => {
        const fetchSoftwares = async () => {
            try {
                const response = await axios.get('http://localhost:3000/library', {
                    withCredentials: true // Ensures cookies are sent with the request
                });
                setSoftwares(response.data);
            } catch (error) {
                console.error('Erro ao buscar softwares:', error);
                if (error.response && error.response.status === 401) {
                    window.location.href = '/login';
                }
            }
        };

        fetchSoftwares();
    }, []);

    const handleButtonClick = (chaveproduto) => {
        window.location.href = `/license/${chaveproduto}`;
    };


    const renderCard = (software) => (
        <div class="col-sm-2 mb-4" key={software.chaveproduto} style={{ margin: '15px' }}>
            <div class="card h-100" style={{ textAlign: 'center' }}>
                <button class="btn-img" onClick={() => handleButtonClick(software.chaveproduto)} style={{ padding: '0', border: 'none', background: 'none' }}>
                    <img src="/images/Logos/figma.png" class="card-img-top" alt={software.nome} style={{ width: '100%', height: 'auto' }} />
                </button>
                <div class="card-body">
                    <h5 class="card-title">{software.nome}</h5>
                    <p class="card-text">Licenças: {software.licenses ? software.licenses.length : 0}</p>
                </div>
            </div>
        </div>
    );

    // Verificar se o usuário está autenticado (exemplo simples)
    const isLoggedIn = localStorage.getItem('token') !== null;

    if (!isLoggedIn) {
        return <div>Você precisa iniciar sessão para acessar esta página.</div>;
    }

    return (
        <div class="d-flex flex-column min-vh-100">
            {/* NAVBAR */}
            <nav class="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/signup/comprador">
                        <img class="warelogo" src="/images/Logos/logo.png" alt="Ware Logo" />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div class="navbar-nav">
                            <a class="nav-link text-white" href="/shop">Explorar</a>
                            <a class="nav-link active text-white" aria-current="page" href="/library">Gestão</a>
                        </div>
                    </div>
                    <form class="d-flex me-3" role="search">
                        <input class="navform form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <button class="btn btn-outline-light" type="submit">Procurar</button>
                    </form>
                    <a href="/" class="btn btn-primary">Terminar Sessão</a>
                </div>
            </nav>
            {/* FIM NAVBAR */}

            <h1 class="titulo">Os meus softwares</h1>

            <div class="librarycont container">
                <div class="row">
                    {softwares.map(renderCard)}
                </div>
            </div>

            <footer class="footer bg-dark text-light fixed-bottom">
                <div class="container d-flex justify-content-center align-items-center">
                    <span class="text-center">&copy; Ware 2024</span>
                </div>
            </footer>
        </div>
    );
};

export default MySoftwares;
