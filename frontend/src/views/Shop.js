import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faCube } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

const Shop = () => {
    const [items, setItems] = useState([]);
    const [type, setType] = useState('softwares'); // Estado para controlar se estamos exibindo softwares ou addons

    useEffect(() => {
        const fetchItems = async () => {
            try {
                let endpoint = '';
                if (type === 'softwares') {
                    endpoint = 'http://localhost:3000/shop/softwares'; // Rota para buscar softwares
                } else if (type === 'addons') {
                    endpoint = 'http://localhost:3000/shop/addons'; // Rota para buscar addons
                }

                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true
                });
                setItems(response.data);
            } catch (error) {
                console.error('Erro ao buscar itens:', error);
            }
        };

        fetchItems();
    }, [type]);

    return (
        <div>
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/shop">
                        <img src="/images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ marginLeft: '-32%' }}>
                        <div className="navbar-nav">
                            <a className="nav-link text-white" href="/shop">Explorar</a>
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

            {/* BOTÕES DE CATEGORIA */}
            <div className="container mt-3">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className={`btn btn-outline-primary ${type === 'softwares' ? 'active' : ''}`} onClick={() => setType('softwares')}>
                            <FontAwesomeIcon icon={faFileAlt} /> Softwares
                        </button>
                    </div>
                    <div className="col-auto">
                        <button className={`btn btn-outline-primary ${type === 'addons' ? 'active' : ''}`} onClick={() => setType('addons')}>
                            <FontAwesomeIcon icon={faCube} /> Addons
                        </button>
                    </div>
                </div>
            </div>
            {/* FIM BOTÕES DE CATEGORIA */}

            {/* LISTA DE ITENS */}
            <div className="container mt-5">
                <div className="row">
                    {items.map(item => (
                        <div className="col-md-4 mb-4" key={item.id}>
                            <div className="card">
                                <img src={item.image} className="card-img-top" alt={item.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text">Preço: ${item.price}</p>
                                    <a href={`/details/${item.id}`} className="btn btn-primary">Ver Detalhes</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* FIM LISTA DE ITENS */}

            {/* RECOMENDAÇÕES */}
            <hr className="custom-hr" />
            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Recomendado para si</h1>

            <div id="carouselrecomendado" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row justify-content-center">
                            {/* Exemplo de cartões de recomendação */}
                            <div className="col-6 d-flex flex-column align-items-center">
                                <div className="card card-custom mt-3" style={{ width: '70%', boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-md-3">
                                            <img src="/images/newicons/asana.png" className="card-img" alt="..." />
                                        </div>
                                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                                            <div className="card-body">
                                                <p className="card-text">Comunicação</p>
                                                <h5 className="card-title">Asana</h5>
                                            </div>
                                            <a href="#" className="btn btn-dark btn-sm" style={{ marginRight: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Outro exemplo de cartão */}
                            <div className="col-6 d-flex flex-column align-items-center" style={{ marginLeft: '-5%' }}>
                                <div className="card card-custom" style={{ width: '70%', boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-md-3">
                                            <img src="/images/newicons/dropbox.png" className="card-img" alt="..." />
                                        </div>
                                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                                            <div className="card-body">
                                                <p className="card-text">Produtividade</p>
                                                <h5 className="card-title">DropBox</h5>
                                            </div>
                                            <a href="#" className="btn btn-dark btn-sm" style={{ marginRight: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Fim dos exemplos */}
                        </div>
                    </div>
                    {/* Mais itens do carrossel podem ser adicionados aqui */}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselrecomendado" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselrecomendado" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* FIM RECOMENDAÇÕES */}

            {/* RODAPÉ */}
            <footer className="footer bg-dark text-light">
                <div className="container d-flex justify-content-center align-items-center">
                    <span className="text-center">&copy; Ware 2024</span>
                </div>
            </footer>
            {/* FIM RODAPÉ */}
        </div>
    );
};

export default Shop; 
