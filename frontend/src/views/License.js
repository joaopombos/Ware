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
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="principalcomprador.html">
                        <img src="/images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ marginLeft: '-32%' }}>
                        <div className="navbar-nav">
                            <a className="nav-link active text-white" aria-current="page" href="principalcomprador.html">Explorar</a>
                            <a className="nav-link text-white" href="librarycompgestor.html">Gestão</a>
                        </div>
                    </div>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <button className="btn btn-outline-light" type="submit">Procurar</button>
                    </form>
                    <button className="btn btn-outline-light me-2" style={{ marginLeft: '0.5%' }} type="button">
                        <i className="bi bi-cart4"></i>
                    </button>
                    <button className="btn btn-outline-light me-2" type="button">Terminar Sessão</button>
                </div>
            </nav>
            {/* FIM NAVBAR */}

            {/* CARD APLICAÇÃO */}
            <div className="card app-card" style={{ backgroundColor: 'transparent' }}>
                <div className="row no-gutters align-items-center">
                    <div className="col-md-3">
                        <img src="images/Logos/figma.png" className="card-img" alt="..." />
                    </div>
                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                        <div className="card-body">
                            <h5 className="card-title">Nome Software</h5>
                            <p className="card-text">Nº de licenças</p>
                        </div>
                        <div className="col-md-3 d-flex justify-content-between align-items-center">
                            <button className="btn btn-outline-danger btn-sm" onClick={handleAssignModalOpen}>Atribuir</button>
                            <button className="btn btn-danger btn-sm" style={{ marginLeft: '20%' }} onClick={handleTicketModalOpen}>Ticket</button>
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
            <table className="table table-bordered">
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
                            <button className="btn btn-icon" aria-label="Info" onClick={handleInfoModalOpen}>
                                <i className="bi bi-info-circle"></i>
                            </button>
                        </th>
                        <td><button className="btn btn-danger btn-sm">Remover</button></td>
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
                    <div className="rounded bg-light p-2 centered-div">
                        <p className="mb-0">Nº Computador</p>
                    </div>
                    <h3 style={{ marginTop: '2%' }}>Produtos:</h3>
                    <div className="rounded bg-light p-3">
                        <div className="product-item">
                            <img src="https://via.placeholder.com/50" alt="Placeholder Image" />
                            <p className="mb-0">NOME</p>
                        </div>
                        <div className="product-item">
                            <img src="https://via.placeholder.com/50" alt="Placeholder Image" />
                            <p className="mb-0">NOME</p>
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
                    <div className="rounded bg-light p-2 centered-div">
                        <p className="mb-0">NOME</p>
                    </div>
                    <h3 style={{ marginTop: '2%' }}>Ticket:</h3>
                    <div className="rounded bg-light p-3">
                        <input type="text" className="form-control" placeholder="Introduza aqui o seu ticket." />
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
