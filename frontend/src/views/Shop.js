import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';
    import 'bootstrap/dist/js/bootstrap.bundle.min';
    import '../CSS/ware.css'; // Importe o arquivo CSS separado

    
    const Shop = () => {
        const [items, setItems] = useState([]);
        const [type, setType] = useState('softwares'); // Default to 'softwares'
    
        useEffect(() => {
            const fetchItems = async () => {
                try {
                    // Adjust the request URL to use the correct endpoint and include type in the query
                    const endpoint = `http://localhost:3000/shop/softwares?type=${type}`;
                    const response = await axios.get(endpoint, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        withCredentials: true
                    });
                    const convertedItems = response.data.map(item => ({
                        ...item,
                        logotipo: item.logotipo ? Buffer.from(item.logotipo).toString('base64') : null,
                        imagenssoftware: item.imagenssoftware ? Buffer.from(item.imagenssoftware).toString('base64') : null
                    }));
                    setItems(convertedItems);
                } catch (error) {
                    console.error('Error fetching items:', error);
                }
            };
    
            fetchItems();
        }, [type]);
    
        const handleTypeChange = (newType) => {
            setType(newType); // Change the item type
        };
    
        // Function to handle button click to redirect for more details
        const handleButtonClick = (id, itemType) => {
            const route = `/shop/${id}?type=${itemType}`;
            window.location.href = route;
        };

        
    
        const renderCard = (item) => (
            <div class="col-sm-2 mb-4" key={item.idproduto} style={{ margin: '15px' }}>
                <div class="card h-100" style={{ textAlign: 'center' }}>
                    <button class="btn-img" onClick={() => handleButtonClick(item.idproduto, type)} style={{ padding: '0', border: 'none', background: 'none' }}>
                        <img src={`data:image/png;base64,${item.logotipo}`} alt={item.nome} style={{ width: '100%', height: 'auto' }} />
                    </button>
                    <div class="card-body">
                        <h5 class="card-title">{item.nome}</h5>
                        <p>{item.descricao}</p>
                    </div>
                </div>
            </div>
        );
    
        return (
            <div>
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
    
                <div class="container mt-3">
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <button class={`btn btn-outline-primary ${type === 'softwares' ? 'active' : ''}`}
                                onClick={() => handleTypeChange('softwares')}>
                                Softwares
                            </button>
                        </div>
                        <div class="col-auto">
                            <button class={`btn btn-outline-primary ${type === 'addons' ? 'active' : ''}`}
                                onClick={() => handleTypeChange('addons')}>
                                Addons
                            </button>
                        </div>
                    </div>
                </div>
                <div class="container mt-5">
                    <div class="row">
                        {items.map(renderCard)}
                    </div>
                </div>
    
                {/* RECOMMENDATIONS */}
                <hr class="custom-hr" />
                <h1 class="titulo">Recomendado para si</h1>
    
                <div id="carouselrecomendado" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="row justify-content-center">
                                {/* Example recommendation cards */}
                                <div class="col-6 d-flex flex-column align-items-center">
                                    <div class="cardup card card-custom mt-3">
                                        <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="images/newicons/asana.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Comunicação</p>
                                                <h5 class="card-title">Asana</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btnup btn btn-dark btn-sm">Saber mais</a>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                {/* More examples can be added here */}
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselrecomendado" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselrecomendado" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
                {/* END RECOMMENDATIONS */}
    
                {/* FOOTER */}
                <footer class="footer bg-dark text-light">
                    <div class="container d-flex justify-content-center align-items-center">
                        <span class="text-center">&copy; Ware 2024</span>
                    </div>
                </footer>
                {/* END FOOTER */}
            </div>
        );
    };
    
    export default Shop;
    