// Shop.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faGamepad, faCamera, faVideo, faCubes, faEdit, faBrush, faMusic, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Shop = () => {
    const [softwares, setSoftwares] = useState([]);
    const [category, setCategory] = useState('Todos');

    useEffect(() => {
        const fetchSoftwares = async () => {
            try {
                const endpoint = category === 'Todos' ? '/shop' : `/shop/category/${category}`;
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setSoftwares(response.data);
            } catch (error) {
                console.error('Error fetching softwares:', error);
            }
        };

        fetchSoftwares();
    }, [category]);

    return (
        <div>
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/signup_comprador">
                        <img src="/images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ marginLeft: '-32%' }}>
                        <div className="navbar-nav">
                            <a className="nav-link text-white" href="/shop/my">Explorar</a>
                            <a className="nav-link active text-white" aria-current="page" href="/library">Gestão</a>
                        </div>
                    </div>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">Procurar</button>
                    </form>
                    <button className="btn btn-outline-light me-2" style={{ marginLeft: '0.5%' }} type="button">
                        <i className="bi bi-cart4"></i>
                    </button>
                    <a href="/home" className="btn btn-primary">Terminar Sessão</a>
                </div>
            </nav>
            {/* FIM NAVBAR */}
            {/* CATEGORIAS */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid justify-content-center">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCategories">
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setCategory('Todos')}>
                                    <FontAwesomeIcon icon={faFileAlt} /> Todos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setCategory('Jogos')}>
                                    <FontAwesomeIcon icon={faGamepad} /> Jogos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setCategory('Fotografia')}>
                                    <FontAwesomeIcon icon={faCamera} /> Fotografia
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setCategory('Vídeo')}>
                                    <FontAwesomeIcon icon={faVideo} /> Vídeo
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setCategory('3D')}>
                                    <FontAwesomeIcon icon={faCubes} /> 3D
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setCategory('Design Gráfico')}>
                                    <FontAwesomeIcon icon={faEdit} /> Design Gráfico
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setCategory('Arte Digital')}>
                                    <FontAwesomeIcon icon={faBrush} /> Arte Digital
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setCategory('Música')}>
                                    <FontAwesomeIcon icon={faMusic} /> Música
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setCategory('Networking')}>
                                    <FontAwesomeIcon icon={faNetworkWired} /> Networking
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* FIM CATEGORAS */}

            <div className="container mt-5">
                <div className="row">
                    {softwares.map(software => (
                        <div className="col-md-4" key={software.idproduto}>
                            <div className="card mb-4">
                                <img src={software.logotipo} className="card-img-top" alt={software.nome} />
                                <div className="card-body">
                                    <h5 className="card-title">{software.nome}</h5>
                                    <p className="card-text">{software.descricao}</p>
                                    <p className="card-text">Versão: {software.versao}</p>
                                    <p className="card-text">Preço: ${software.precoproduto}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <hr class="custom-hr" />

            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Recomendado para si</h1>

            <div id="carouselrecomendado" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="row justify-content-center">
                            <div class="col-6 d-flex flex-column align-items-center">
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/excel.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Microsoft Excel</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/asana.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Comunicação</p>
                                                <h5 class="card-title">Asana</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-column align-items-center" style={{ marginleft: '-5%' }}>
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/dropbox.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtivade</p>
                                                <h5 class="card-title">DropBox</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/miro.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Comunicação</p>
                                                <h5 class="card-title">Miro</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row justify-content-center">
                            <div class="col-6 d-flex flex-column align-items-center">
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/notion.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtivade</p>
                                                <h5 class="card-title">Notion</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/fcp.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Vídeo</p>
                                                <h5 class="card-title">Final Cut Pro</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-column align-items-center" style={{ marginleft: '-5%' }}>
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/office.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Office 365</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="/images/newicons/slack.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Slack</h5>
                                            </div>
                                            <a href="#" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselrecomendado" data-bs-slide="prev" >
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselrecomendado" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <br></br>
            <footer class="footer bg-dark text-light">
                <div class="container d-flex justify-content-center align-items-center">
                    <span class="text-center">&copy; Ware 2024</span>
                 </div>
             </footer>
        </div>
    );
};

export default Shop;
