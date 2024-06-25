import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './library.css';
import axios from 'axios';

const MySoftwares = () => {
    const [softwares, setSoftwares] = useState([]);

    useEffect(() => {
        const fetchSoftwares = async () => {
            try {
                const response = await axios.get('/api/library', {
                    withCredentials: true,  // Ensure cookies are sent with the request
                });
                setSoftwares(response.data);
            } catch (error) {
                console.error('Error fetching softwares:', error);
            }
        };

        fetchSoftwares();
    }, []);

    const handleButtonClick = (chaveproduto) => {
        window.location.href = `/license/${chaveproduto}`;
    };

    const renderCard = () => (
        <div class="col-sm-2">
            <div class="card">
                <button class="btn-img" onClick={() => handleButtonClick("/license")}>
                    <img src="/images/Logos/figma.png" class="card-img-top" alt="..." />
                </button>
                <div class="card-body">
                    <h5 class="card-title">Nome Software</h5>
                    <p class="card-text">Licenças</p>
                </div>
            </div>
        </div>
    );

    return (
        <div class="d-flex flex-column min-vh-100">
            <nav class="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/signup_comprador">
                        <img src="/images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ marginLeft: '-32%' }}>
                        <div class="navbar-nav">
                            <a class="nav-link text-white" href="/shop/my">Explorar</a>
                            <a class="nav-link active text-white" aria-current="page" href="/library">Gestão</a>

                        </div>
                    </div>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <button class="btn btn-outline-light" type="submit">Procurar</button>
                    </form>
                    <button class="btn btn-outline-light me-2" style={{ marginLeft: '0.5%' }} type="button">
                        <i class="bi bi-cart4"></i>
                    </button>
                    <a href="/home" class="btn btn-primary">Terminar Sessão</a>

                </div>
            </nav>

            <h1 class="my-5" style={{ marginLeft: '5%' }}>Os meus softwares</h1>

            <div class="container" style={{ marginBottom: '5%', marginTop:'-1%' }}>
                <div class="row">
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
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
