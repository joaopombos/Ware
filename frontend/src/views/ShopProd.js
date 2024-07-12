import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import Cookies from 'js-cookie'; 

const stripePromise = loadStripe('pk_test_51JbCVGJuN2xREvwF3DtK39P7YXbFYh5zsLeDs0q0KeDsIznQA7lEzniCBVAUswk0rzYYYr7s34AkNWavQTQY9mWc00fYGRbsv1');

const ShopProd = () => {
    const { idproduto } = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [showhistModal, setShowhistModal] = useState(false);
    const [showorcModal, setShoworcModal] = useState(false);
    const [showCompraModal, setShowCompraModal] = useState(false);
    const [quantidadeLicencas, setQuantidadeLicencas] = useState(1);
    const [versions, setVersions] = useState([]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const endpoint = `http://localhost:3000/shop/${idproduto}`;
                const response = await axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    withCredentials: true
                });
                setItem(response.data);
            } catch (error) {
                console.error('Error fetching item:', error);
                setError(error);
            }
        };

        fetchItem();
    }, [idproduto]);

    const handleModalhistOpen = async () => {
        setShowhistModal(true);
        try {
            const response = await axios.get(`http://localhost:3000/versions/${idproduto}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true
            });
            setVersions(response.data);
        } catch (error) {
            console.error('Error fetching versions:', error);
        }
    };

    const handleModalhistClose = () => setShowhistModal(false);
    const handleModalorcOpen = () => setShoworcModal(true);
    const handleModalorcClose = () => setShoworcModal(false);
    const handleModalCompraOpen = () => setShowCompraModal(true);
    const handleModalCompraClose = () => setShowCompraModal(false);

    const handleCompra = async () => {
        try {
            const response = await axios.post('http://localhost:3000/shop/compra/', {
                quantidade: quantidadeLicencas,
                idproduto: item.idproduto,
                nome: item.nome,
                versao: item.versao,
                emp_nif: Cookies.get('emp_nif')
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true
            });

            const sessionId = response.data.sessionId;

            // Redirecionar para o checkout do Stripe
            const stripe = await stripePromise;
            await stripe.redirectToCheckout({
                sessionId: sessionId
            });

        } catch (error) {
            console.error('Error during purchase:', error);
            alert(`Erro ao realizar compra: ${error.message}`);
        }
    };

    if (error) {
        return <div>Erro ao carregar dados: {error.message}</div>;
    }

    return (
        <>
            {item && (
                <>
                    {/* NAVBAR */}
                    <nav className="navbar navbar-expand-lg bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/signup/comprador">
                            <img className="warelogo" src="/images/Logos/logo.png" alt="Ware Logo" />
                            </a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                    <a className="nav-link text-white" href="/shop">Explorar</a>
                                    <a className="nav-link active text-white" aria-current="page" href="/library">Gestão</a>
                                </div>
                            </div>
                            <form className="d-flex me-3" role="search">
                                <input className="navform form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                                <button className="btn btn-outline-light" type="submit">Procurar</button>
                            </form>
                            <a href="/" className="btn btn-primary">Terminar Sessão</a>
                        </div>
                    </nav>
                    {/* FIM NAVBAR */}

                    <div className="container mt-4">
                        <div className="row no-gutters align-items-center">
                            <div className="col-md-2">
                                {item.logotipo ? (
                                    <img src={`data:image/png;base64,${item.logotipo}`} className="card-img" alt="Item Logo" />
                                ) : (
                                    <img src="/placeholder-image.png" className="card-img" alt="Placeholder" />
                                )}
                            </div>
                            <div className="col-md-10 d-flex justify-content-between align-items-center">
                                <div className="card-body" style={{ marginLeft: '100%', marginRight: '3%' }}>
                                    <h2 className="card-title" style={{ marginBottom: '1rem' }}>{item.nome}</h2>
                                    <div className="d-flex justify-content-start align-items-center">
                                        <p className="mb-0 me-3">€{item.precoproduto || item.preco}</p>
                                        <Button variant="outline-danger" onClick={handleModalCompraOpen}>
                                            Comprar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="custom-hr" />

                    <h1 className="ms-5 mt-5 mb-5">Descrição</h1>

                    <div className="container">
                        <h4 className="card-text">{item.descricao}</h4>
                    </div>

                    <hr className="custom-hr" />

                    <div className="container-fluid mt-5">
                        <div className="d-flex justify-content-between ms-5 me-5">
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
                                <Form>
                                    {versions.length > 0 ? (
                                        versions.map((version) => (
                                            <Form.Group controlId={`formVersao${version.idversao}`} key={version.idversao}>
                                                <Form.Label>Versão: {version.versao}</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={`Data: ${new Date(version.datamodifi).toLocaleDateString()}`}
                                                    readOnly
                                                />
                                            </Form.Group>
                                        ))
                                    ) : (
                                        <p>No versions available.</p>
                                    )}
                                </Form>
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
                                    <Form.Group controlId="formQuantidade">
                                        <Form.Label>Quantidade</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={quantidadeLicencas}
                                            onChange={(e) => setQuantidadeLicencas(e.target.value)}
                                            min="1"
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleModalorcClose}>
                                    Fechar
                                </Button>
                                <Button variant="primary" onClick={() => alert('Orçamento pedido!')}>
                                    Pedir Orçamento
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        <Modal show={showCompraModal} onHide={handleModalCompraClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirmar Compra</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Tem a certeza que quer comprar {quantidadeLicencas} licença(s) de {item.nome}?</p>
                                <Form.Group controlId="formQuantidadeLicencas">
                                    <Form.Label>Quantidade de Licenças</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={quantidadeLicencas}
                                        onChange={(e) => setQuantidadeLicencas(e.target.value)}
                                        min="1"
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleModalCompraClose}>
                                    Cancelar
                                </Button>
                                <Button variant="primary" onClick={handleCompra}>
                                    Comprar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </>
            )}
        </>
    );
};

export default ShopProd;

