// License.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Modal, Button, Form } from 'react-bootstrap';
import '../CSS/ware.css';


const License = () => {
    const { chaveproduto } = useParams();
    const [software, setSoftware] = useState(null);
    const [licenses, setLicenses] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentLicense, setCurrentLicense] = useState(null);
    const [newNomepc, setNewNomepc] = useState('');

    useEffect(() => {
        const fetchSoftwareLicenses = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/license/${chaveproduto}`, {
                    withCredentials: true // Ensures cookies are sent with the request
                });
                setSoftware(response.data.software);
                setLicenses(response.data.licenses);
            } catch (error) {
                console.error('Error fetching software licenses:', error);
                if (error.response && error.response.status === 401) {
                    // Redirect the user to the login page or show unauthorized message
                    window.location.href = '/login';
                }
            }
        };

        fetchSoftwareLicenses();
    }, [chaveproduto]);

    const handleUpdateModalOpen = (license) => {
        setCurrentLicense(license);
        setNewNomepc(license.nomepc);
        setShowUpdateModal(true);
    };

    const handleUpdateModalClose = () => {
        setShowUpdateModal(false);
        setCurrentLicense(null);
    };

    const handleUpdateSubmit = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/license/${chaveproduto}`,
                {
                    idatribuida: currentLicense.idatribuida,
                    nomepc: newNomepc
                }, {
                withCredentials: true // Ensures cookies are sent with the request
            });
            setLicenses(licenses.map(license => license.idatribuida === response.data.idatribuida ? response.data : license));
            handleUpdateModalClose();
        } catch (error) {
            console.error('Error updating license:', error);
        }
    };

    const handleLicenseRemove = async (idatribuida) => {
        try {
            const response = await axios.put(`http://localhost:3000/license/${chaveproduto}`,
                {
                    idatribuida,
                    nomepc: null
                }, {
                withCredentials: true // Ensures cookies are sent with the request
            });
            setLicenses(licenses.map(license => license.idatribuida === idatribuida ? response.data : license));
        } catch (error) {
            console.error('Error removing license:', error);
        }
    };

    if (!software) {
        return <div>Loading...</div>;
    }

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

            <h1 class="titulo">Licenças para {software.nome}</h1>

            <div class="contlice container">
                <div class="row">
                    {licenses.map(license => (
                        <div class="licen col-sm-3 mb-4" key={license.idatribuida}>
                            <div class="cardlice card h-100">
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <h5 class="card-title">PC: {license.nomepc}</h5>
                                    <p class="card-text">Data: {new Date(license.dataatri).toLocaleDateString()}</p>
                                    <button class="btn btn-primary mb-2" onClick={() => handleUpdateModalOpen(license)}>Atualizar</button>
                                    <button class="btn btn-danger mt-auto" onClick={() => handleLicenseRemove(license.idatribuida)}>Remover</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer class="footer bg-dark text-light fixed-bottom">
                <div class="container d-flex justify-content-center align-items-center">
                    <span class="text-center">&copy; Ware 2024</span>
                </div>
            </footer>

            <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualizar Nome do PC</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNomepc">
                            <Form.Label>Nome do PC</Form.Label>
                            <Form.Control
                                type="text"
                                value={newNomepc}
                                onChange={(e) => setNewNomepc(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleUpdateModalClose}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleUpdateSubmit}>
                        Atualizar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default License;
