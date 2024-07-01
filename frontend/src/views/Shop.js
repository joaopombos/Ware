    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';
    import 'bootstrap/dist/js/bootstrap.bundle.min';
    
    const Shop = () => {
        const [items, setItems] = useState([]);
        const [type, setType] = useState('softwares'); // State to control if we are displaying softwares or addons
    
        useEffect(() => {
            const fetchItems = async () => {
                try {
                    let endpoint = '';
                    if (type === 'softwares') {
                        endpoint = 'http://localhost:3000/shop/softwares'; // Route to fetch softwares
                    } else if (type === 'addons') {
                        endpoint = 'http://localhost:3000/shop/addons'; // Route to fetch addons
                    }
    
                    const response = await axios.get(endpoint, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        withCredentials: true
                    });
                    setItems(response.data);
                } catch (error) {
                    console.error('Error fetching items:', error);
                }
            };
    
            fetchItems();
        }, [type]);
    
        const handleButtonClick = (id, type) => {
            const route = `/shop/${id}?type=${type}`;
            window.location.href = route;
        };
        
        const renderCard = (item) => (
            <div className="col-sm-2 mb-4" key={item.idproduto || item.idaddon} style={{ margin: '15px' }}>
                <div className="card h-100" style={{ textAlign: 'center' }}>
                    <button className="btn-img" onClick={() => handleButtonClick(item.idproduto || item.idaddon, type)} style={{ padding: '0', border: 'none', background: 'none' }}>
                        <img src="/images/Logos/figma.png" className="card-img-top" alt={item.nome} style={{ width: '100%', height: 'auto' }} />
                    </button>
                    <div className="card-body">
                        <h5 className="card-title">{item.nome}</h5>
                    </div>
                </div>
            </div>
        );
        
    
        return (
            <div>
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
    
                {/* BOTÕES DE CATEGORIA */}
                <div className="container mt-3">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <button className={`btn btn-outline-primary ${type === 'softwares' ? 'active' : ''}`} onClick={() => setType('softwares')}>
                                Softwares
                            </button>
                        </div>
                        <div className="col-auto">
                            <button className={`btn btn-outline-primary ${type === 'addons' ? 'active' : ''}`} onClick={() => setType('addons')}>
                                Addons
                            </button>
                        </div>
                    </div>
                </div>
                {/* FIM BOTÕES DE CATEGORIA */}
    
                {/* LISTA DE ITENS */}
                <div className="container mt-5">
                    <div className="row">
                        {items.map(renderCard)}
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
    