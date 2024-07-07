/*  Este Funciona

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
                produtoId: item.idproduto || item.idaddon,
                nome: item.nome,
                versao: item.versao,
                emp_nif: '123456789' // Replace with actual emp_nif value as needed
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
    }  */

        import React, { useState, useEffect } from 'react';
        import axios from 'axios';
        import { Modal, Button, Form } from 'react-bootstrap';
        import { useParams, useLocation } from 'react-router-dom';
        import '../CSS/ware.css';

        
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
            }, [idproduto, type]);
        
            const handleModalhistOpen = () => setShowhistModal(true);
            const handleModalhistClose = () => setShowhistModal(false);
            const handleModalorcOpen = () => setShoworcModal(true);
            const handleModalorcClose = () => setShoworcModal(false);
        
            const handleModalCompraOpen = () => setShowCompraModal(true);
            const handleModalCompraClose = () => setShowCompraModal(false);
        
            const handleCompra = async () => {
                try {
                    await axios.post('http://localhost:3000/shop/compra', {
                        quantidade: quantidadeLicencas,
                        produtoId: item.idproduto || item.idaddon,
                        nome: item.nome,
                        versao: item.versao,
                        emp_nif: '123456789'
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
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Procurar" aria-label="Search" />
                        <button class="btn btn-outline-light" type="submit">Procurar</button>
                    </form>
                    <a href="/" class="btn btn-primary">Terminar Sessão</a>
                </div>
            </nav>
                    {/* FIM NAVBAR */}

                    <div class="container mt-4">
                        <div class="row no-gutters align-items-center">
                            <div class="col-md-2">
                                <img src={`/images/${item.logotipo}`} class="card-img" alt="Item Logo" />
                            </div>
                            <div class="col-md-10 d-flex justify-content-between align-items-center">
                                <div class="card-body" style={{ marginLeft: '100%', marginRight: '3%' }}>
                                    <h2 class="card-title" style={{ marginBottom: '1rem' }}>{item.nome}</h2>
                                    <div class="d-flex justify-content-start align-items-center">
                                        <p class="mb-0 me-3">€{item.precoproduto || item.preco}</p>
                                        <Button variant="outline-danger" onClick={handleModalCompraOpen}>
                                            Comprar
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="custom-hr" />

                    <h1 class="ms-5 mt-5 mb-5">Descrição</h1>

                    <div class="container">
                        <h4 class="card-text">{item.descricao}</h4>
                    </div>

                    <hr class="custom-hr" />

                    <div class="container-fluid mt-5">
                        <div class="d-flex justify-content-between ms-5 me-5">
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
                                    <Form.Group class="mb-3" controlId="formNomeEmpresa">
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

                    <hr class="custom-hr" />

                    <h1 class="titulo">Planos</h1>

                    <div class="container-fluid" style={{ background: 'linear-gradient(220.55deg, #00E0EE 0%, #AD00FE 100%)' }}>
                        <div class="container p-5 row row-cols-1 row-cols-md-3 g-4 justify-content-evenly">
                            <div class="col">
                                <div class="card h-100 shadow-lg" style={{ background: 'white', width: '18rem' }}>
                                    <div class="card-body">
                                        <div class="text-center p-3">
                                            <h5 class="card-title">Pequenas Empresas</h5>
                                            <br />
                                            <span class="h2">€</span>/preço unitário
                                            <br /><br />
                                        </div>
                                        <h4 style={{ textAlign: 'center' }}>-10% de desconto</h4>
                                        <p class="card-text" style={{ textAlign: 'center' }}>A partir de 50 licenças e máximo de 100.</p>
                                    </div>
                                    <div class="card-body text-center" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                                        <button class="btn btn-outline-dark btn-lg" style={{ borderRadius: '30px' }}>Selecionar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card h-100 shadow-lg" style={{ background: 'white', width: '18rem' }}>
                                    <div class="card-body">
                                        <div class="text-center p-3">
                                            <h5 class="card-title">Médias Empresas</h5>
                                            <br />
                                            <span class="h2">€</span>/preço unitário
                                            <br /><br />
                                        </div>
                                        <h4 style={{ textAlign: 'center' }}>-20% de desconto</h4>
                                        <p class="card-text" style={{ textAlign: 'center' }}>A partir de 100 licenças e máximo de 200.</p>
                                    </div>
                                    <div class="card-body text-center" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                                        <button class="btn btn-outline-dark btn-lg" style={{ borderRadius: '30px' }}>Selecionar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="card h-100 shadow-lg" style={{ background: 'white', width: '18rem' }}>
                                    <div class="card-body">
                                        <div class="text-center p-3">
                                            <h5 class="card-title">Grandes Empresas</h5>
                                            <br />
                                            <span class="h2">€</span>/preço unitário
                                            <br /><br />
                                        </div>
                                        <h4 style={{ textAlign: 'center' }}>-30% de desconto</h4>
                                        <p class="card-text" style={{ textAlign: 'center' }}>A partir de 200 licenças.</p>
                                    </div>
                                    <div class="card-body text-center" style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                                        <button class="btn btn-outline-dark btn-lg" style={{ borderRadius: '30px' }}>Selecionar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container d-flex justify-content-center" style={{ marginTop: '2%' }}>
                            <p class="text-center" style={{ color: 'white' }}>Se o que procura não está representado acima, peça um orçamento <a href="/shop" onClick={handleModalorcOpen} class="text-light"><span class="text-dark">aqui</span></a>.</p>
                        </div>
                    </div>

                    <hr class="custom-hr" />

                    <h1 class="titulo">Avaliações</h1>

                    <div class="avrow row">
                <div class="col-md-3 mb-4">
                    <div class="cardvav card">
                        <img src="images/icons/aspas.png" class="aspas card-img-top img-fluid mx-auto d-block" alt="..." />
                        <div class="card-body text-center">
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                est id, tristique viverra mauris. </p>
                            <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                            <p class="card-text mb-2">Categoria</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-4">
                    <div class="cardvav card">
                        <img src="images/icons/aspas.png" class="aspas card-img-top img-fluid mx-auto d-block" alt="..." />
                        <div class="card-body text-center">
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                est id, tristique viverra mauris. </p>
                            <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                            <p class="card-text mb-2">Categoria</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-4">
                    <div class="cardvav card">
                        <img src="images/icons/aspas.png" class="aspas card-img-top img-fluid mx-auto d-block" alt="..." />
                        <div class="card-body text-center">
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                est id, tristique viverra mauris. </p>
                            <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                            <p class="card-text mb-2">Categoria</p>
                        </div>
                    </div>
                </div>
            </div>

                    <footer class="footer bg-dark text-light">
                        <div class="container d-flex justify-content-center align-items-center">
                            <span class="text-center">&copy; Ware 2024</span>
                        </div>
                    </footer>
                </>
            )}
        </>
    );
}
