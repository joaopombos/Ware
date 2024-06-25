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
            {/* FIM CATEGORIAS */}

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
        </div>
    );
};

export default Shop;
