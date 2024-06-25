import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './license.css';
import { Modal, Button } from 'react-bootstrap';

function App() {
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showKeyModal, setShowKeyModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showTicketModal, setShowTicketModal] = useState(false);

    const handleAssignModalOpen = () => {
        setShowAssignModal(true);
    };

    const handleAssignModalClose = () => {
        setShowAssignModal(false);
    };

    const handleKeyModalOpen = () => {
        setShowKeyModal(true);
    };

    const handleKeyModalClose = () => {
        setShowKeyModal(false);
    };

    const handleInfoModalOpen = () => {
        setShowInfoModal(true);
    };

    const handleInfoModalClose = () => {
        setShowInfoModal(false);
    };

    const handleTicketModalOpen = () => {
        setShowTicketModal(true);
    };

    const handleTicketModalClose = () => {
        setShowTicketModal(false);
    };

    return (
        <div>
            {/* NAVBAR */}
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
                            <a class="nav-link active text-white" aria-current="page" href="principalcomprador.html">Explorar</a>
                            <a class="nav-link text-white" href="/library">Gestão</a>
                        </div>
                    </div>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <a class="btn btn-outline-light" href="/library" role="button">Procurar</a>
                    </form>
                    <button class="btn btn-outline-light me-2" style={{ marginLeft: '0.5%' }} type="button">
                        <i class="bi bi-cart4"></i>
                    </button>
                    <a href="/home" class="btn btn-primary">Terminar Sessão</a>
                </div>
            </nav>
            {/* FIM NAVBAR */}

            {/* CARD APLICAÇÃO */}
            <div class="card app-card" style={{ backgroundColor: 'transparent' }}>
                <div class="row no-gutters align-items-center">
                    <div class="col-md-3">
                        <img src="images/Logos/figma.png" class="card-img" alt="..." />
                    </div>
                    <div class="col-md-8 d-flex justify-content-between align-items-center">
                        <div class="card-body">
                            <h5 class="card-title">Nome Software</h5>
                            <p class="card-text">Nº de licenças</p>
                        </div>
                        <div class="col-md-3 d-flex justify-content-between align-items-center">
                            <button class="btn btn-outline-danger btn-sm" onClick={handleAssignModalOpen}>Atribuir</button>
                            <button class="btn btn-danger btn-sm" style={{ marginLeft: '20%' }} onClick={handleTicketModalOpen}>Ticket</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={showAssignModal} onHide={handleAssignModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chave da licença a ser atribuída:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>XXXX-XXXX-XXXX-XXX</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleAssignModalClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* TABELA */}
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Computadores com licença ativa</th>
                        <th scope="col">Remover licença</th>
                        <th scope="col">Ultima atualização</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">
                            PC-123
                            <button class="btn btn-icon" aria-label="Info" onClick={handleInfoModalOpen}>
                                <i class="bi bi-info-circle"></i>
                            </button>
                        </th>
                        <td><button class="btn btn-danger btn-sm">Remover</button></td>
                        <td>08/03/2024 às 09:27</td>
                    </tr>
                    {/* Additional rows as needed */}
                </tbody>
            </table>
            {/* FIM TABELA */}

            <Modal show={showInfoModal} onHide={handleInfoModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Licença</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Licença:</h3>
                    <div class="rounded bg-light p-2 centered-div">
                        <p class="mb-0">Nº Computador</p>
                    </div>
                    <h3 style={{ marginTop: '2%' }}>Produtos:</h3>
                    <div class="rounded bg-light p-3">
                        <div class="product-item">
                            <img src="https://via.placeholder.com/50" alt="Placeholder Image" />
                            <p class="mb-0">NOME</p>
                        </div>
                        <div class="product-item">
                            <img src="https://via.placeholder.com/50" alt="Placeholder Image" />
                            <p class="mb-0">NOME</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleInfoModalClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showTicketModal} onHide={handleTicketModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Software:</h3>
                    <div class="rounded bg-light p-2 centered-div">
                        <p class="mb-0">NOME</p>
                    </div>
                    <h3 style={{ marginTop: '2%' }}>Ticket:</h3>
                    <div class="rounded bg-light p-3">
                        <input type="text" class="form-control" placeholder="Introduza aqui o seu ticket." />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleTicketModalClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* FOOTER */}
            <footer class="footer bg-dark text-light fixed-bottom">
        <div class="container d-flex justify-content-center align-items-center">
          <span class="text-center">&copy; Ware 2024</span>
        </div>
      </footer>
        </div>
    );
}

export default App;
