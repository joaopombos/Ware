import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { useParams, useLocation } from 'react-router-dom';

export default function ShopProd() {
    const { idproduto } = useParams();
    const location = useLocation();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);
    const [showhistModal, setShowhistModal] = useState(false);
    const [showorcModal, setShoworcModal] = useState(false);
    const [showCompraModal, setShowCompraModal] = useState(false);
    const [quantidadeLicencas, setQuantidadeLicencas] = useState(1);

    const query = new URLSearchParams(location.search);
    const type = query.get('type');

    useEffect(() => {
        const fetchItem = async () => {
            try {
                let endpoint = '';
                if (type === 'softwares') {
                    endpoint = `http://localhost:3000/shop/${idproduto}`;
                } else if (type === 'addons') {
                    endpoint = `http://localhost:3000/addons/${idproduto}`;
                }
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
    }, [idproduto, type]);

    const handleModalhistOpen = () => setShowhistModal(true);
    const handleModalhistClose = () => setShowhistModal(false);
    const handleModalorcOpen = () => setShoworcModal(true);
    const handleModalorcClose = () => setShoworcModal(false);

    const handleModalCompraOpen = () => setShowCompraModal(true);
    const handleModalCompraClose = () => setShowCompraModal(false);

    const handleCompra = async () => {
        try {
            const response = await axios.post('http://localhost:3000/shop/compra', {
                quantidade: quantidadeLicencas,
                produtoId: item.id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true
            });

            alert(`Compra realizada com sucesso para ${quantidadeLicencas} licença(s)`);
            handleModalCompraClose();
        } catch (error) {
            console.error('Error during purchase:', error);
            alert(`Erro ao realizar compra: ${error.message}`);
        }
    };

    if (error) {
        console.error('Rendering error message:', error);
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
                                <button className="btn btn-outline-light" type="submit" style={{ marginRight: '10px' }}>Procurar</button>
                            </form>
                            <a href="/" className="btn btn-primary">Terminar Sessão</a>
                        </div>
                    </nav>
                    {/* FIM NAVBAR */}

                    <div className="container mt-4">
                        <div className="row no-gutters align-items-center">
                            <div className="col-md-2">
                                <img src={`/images/${item.logotipo}`} className="card-img" alt="Item Logo" />
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
                                    {item.versao && (
                                        <Form.Group controlId="formVersao">
                                            <Form.Label>Versão do Item</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Insira a versão do item"
                                                value={item.versao}
                                                readOnly
                                            />
                                        </Form.Group>
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
                                    <Form.Group className="mb-3" controlId="formNomeEmpresa">
                                        <Form.Label>Quantidade</Form.Label>
                                        <Form.Control type="text" placeholder="Digite a quantidade de licenças." />
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

                        <Modal show={showCompraModal} onHide={handleModalCompraClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Comprar Licenças</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group controlId="formQuantidadeLicencas">
                                    <Form.Label>Quantidade de Licenças</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={quantidadeLicencas}
                                        onChange={(e) => setQuantidadeLicencas(parseInt(e.target.value))}
                                        min={1}
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

                    <hr className="custom-hr" />

                    <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Planos</h1>

                    <div className="container-fluid" style={{ background: 'linear-gradient(220.55deg, #00E0EE 0%, #AD00FE 100%)' }}>
                        <div className="container p-5 row row-cols-1 row-cols-md-3 g-4 justify-content-evenly">
                            <div className="col">
                                <div className="card h-100 shadow-lg" style={{ background: 'white', width: '18rem' }}>
                                    <div className="card-body">
                                        <div className="text-center p-3">
                                            <h5 className="card-title">Pequenas Empresas</h5>
                                            <br />
                                            <span className="h2">€</span>/preço unitário
                                            <br /><br />
                                        </div>
                                        <h4 style={{ textAlign: 'center' }}>-10% de desconto</h4>
                                        <p className="card-text" style={{ textAlign: 'center' }}>A partir de 50 licenças e máximo de 100.</p>
                                    </div>
                                    <div className="card-body text-center" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                                        <button className="btn btn-outline-dark btn-lg" style={{ borderRadius: '30px' }}>Selecionar</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 shadow-lg" style={{ background: 'white', width: '18rem' }}>
                                    <div className="card-body">
                                        <div className="text-center p-3">
                                            <h5 className="card-title">Médias Empresas</h5>
                                            <br />
                                            <span className="h2">€</span>/preço unitário
                                            <br /><br />
                                        </div>
                                        <h4 style={{ textAlign: 'center' }}>-20% de desconto</h4>
                                        <p className="card-text" style={{ textAlign: 'center' }}>A partir de 100 licenças e máximo de 200.</p>
                                    </div>
                                    <div className="card-body text-center" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                                        <button className="btn btn-outline-dark btn-lg" style={{ borderRadius: '30px' }}>Selecionar</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card h-100 shadow-lg" style={{ background: 'white', width: '18rem' }}>
                                    <div className="card-body">
                                        <div className="text-center p-3">
                                            <h5 className="card-title">Grandes Empresas</h5>
                                            <br />
                                            <span className="h2">€</span>/preço unitário
                                            <br /><br />
                                        </div>
                                        <h4 style={{ textAlign: 'center' }}>-30% de desconto</h4>
                                        <p className="card-text" style={{ textAlign: 'center' }}>A partir de 200 licenças.</p>
                                    </div>
                                    <div className="card-body text-center" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                                        <button className="btn btn-outline-dark btn-lg" style={{ borderRadius: '30px' }}>Selecionar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="container d-flex justify-content-center" style={{ marginTop: '2%' }}>
                            <p className="text-center" style={{ color: 'white' }}>Se o que procura não está representado acima, peça um orçamento <a href="#" onClick={handleModalorcOpen} className="text-light"><span className="text-dark">aqui</span></a>.</p>
                        </div>
                    </div>

                    <hr className="custom-hr" />

                    <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Avaliações</h1>

                    <div className="row" style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                        <div className="col-md-3 mb-4">
                            <div className="card" style={{ marginBottom: '5%', width: '18rem' }}>
                                <img src="/images/icons/aspas.png" className="card-img-top img-fluid mx-auto d-block" style={{ width: '75%', margin: '30px' }} alt="..." />
                                <div className="card-body text-center">
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                        est id, tristique viverra mauris. </p>
                                    <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                    <p className="card-text mb-2">Categoria</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="card" style={{ marginBottom: '5%', width: '18rem' }}>
                                <img src="/images/icons/aspas.png" className="card-img-top img-fluid mx-auto d-block" style={{ width: '75%', margin: '30px' }} alt="..." />
                                <div className="card-body text-center">
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                        est id, tristique viverra mauris. </p>
                                    <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                    <p className="card-text mb-2">Categoria</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-4">
                            <div className="card" style={{ marginBottom: '5%', width: '18rem' }}>
                                <img src="/images/icons/aspas.png" className="card-img-top img-fluid mx-auto d-block" style={{ width: '75%', margin: '30px' }} alt="..." />
                                <div className="card-body text-center">
                                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                        est id, tristique viverra mauris. </p>
                                    <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                    <p className="card-text mb-2">Categoria</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="footer bg-dark text-light">
                        <div className="container d-flex justify-content-center align-items-center">
                            <span className="text-center">&copy; Ware 2024</span>
                        </div>
                    </footer>
                </>
            )}
        </>
    );
}
