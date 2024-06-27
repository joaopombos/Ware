import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function ShopProd() {
    const [software, setSoftware] = useState(null);
    const [error, setError] = useState(null);
    const { idproduto } = useParams();
    const [showhistModal, setShowhistModal] = useState(false);
    const [showorcModal, setShoworcModal] = useState(false);

    useEffect(() => {
        const fetchSoftware = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/shop/${idproduto}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true
                });

                console.log(response.data); // Log the response data

                setSoftware(response.data[0]); // Assuming response.data is an array with a single object
            } catch (error) {
                setError(error);
            }
        };

        fetchSoftware();
    }, [idproduto]);

    const handleModalhistOpen = () => setShowhistModal(true);
    const handleModalhistClose = () => setShowhistModal(false);
    const handleModalorcOpen = () => setShoworcModal(true);
    const handleModalorcClose = () => setShoworcModal(false);

    if (error) {
        return <div>Erro ao carregar dados: {error.message}</div>;
    }

    return (
        <>
            {software && (
                <>
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

                    <div className="container" style={{ marginTop: '4%' }}>
                        <div className="row no-gutters align-items-center">
                            <div className="col-md-2">
                                {/* Placeholder for logo */}
                                <img src={`/images/${software.logotipo}`} className="card-img" alt="Software Logo" />
                            </div>
                            <div className="col-md-10 d-flex justify-content-between align-items-center">
                                <div className="card-body" style={{ marginLeft: '3%' }}>
                                    <h2 className="card-title">{software.nome}</h2>
                                </div>
                                <div className="d-flex justify-content-start align-items-center" style={{ marginLeft: 'auto', paddingRight: '10%' }}>
                                <p className="mb-0 ms-2">€{software.precoproduto}</p>
                                    <a className="btn btn-outline-danger btn-sm" href={`/shop/${software.idproduto}/confirm`} role="button">
                                        Comprar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="custom-hr" />

                    <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Descrição</h1>

                    <div className="container">
                    <h4 className="card-text">{software.descricao}</h4>
                    </div>

                    <hr className="custom-hr" />

                    <div className="container-fluid" style={{ marginTop: '5%' }}>
                        <div className="d-flex justify-content-between" style={{ marginLeft: '5%', marginRight: '5%' }}>
                            <Button variant="secondary" onClick={handleModalhistOpen}>
                                Versões
                            </Button>
                            <Button variant="secondary" onClick={handleModalorcOpen}>
                                Pedir Orçamento
                            </Button>
                        </div>

                        <Modal show={showhistModal} onHide={handleModalhistClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Historial de Versões</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <h4>{software.versao}</h4>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleModalhistClose}>
                                    Fechar
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showorcModal} onHide={handleModalorcClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Pedir Orçamento</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formNomeEmpresa">
                                        <Form.Label>Nome da Empresa</Form.Label>
                                        <Form.Control type="text" placeholder="Digite o nome da empresa" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formEmailEmpresa">
                                        <Form.Label>Email da Empresa</Form.Label>
                                        <Form.Control type="email" placeholder="Digite o email da empresa" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formTelefoneEmpresa">
                                        <Form.Label>Telefone da Empresa</Form.Label>
                                        <Form.Control type="tel" placeholder="Digite o telefone da empresa" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formDescricaoOrcamento">
                                        <Form.Label>Descrição do Pedido de Orçamento</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Descreva o que você precisa" />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleModalorcClose}>
                                    Fechar
                                </Button>
                                <Button variant="primary" onClick={() => alert('Pedido enviado!')}>
                                    Enviar Pedido
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </>
            )}
        </>
    );
}
