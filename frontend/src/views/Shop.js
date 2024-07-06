import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import 'bootstrap/dist/css/bootstrap.min.css';
    import 'bootstrap-icons/font/bootstrap-icons.css';
    import 'bootstrap/dist/js/bootstrap.bundle.min';
    
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
            <div className="col-sm-2 mb-4" key={item.idproduto} style={{ margin: '15px' }}>
                <div className="card h-100" style={{ textAlign: 'center' }}>
                    <button className="btn-img" onClick={() => handleButtonClick(item.idproduto, type)} style={{ padding: '0', border: 'none', background: 'none' }}>
                        <img src={`data:image/png;base64,${item.logotipo}`} alt={item.nome} style={{ width: '100%', height: 'auto' }} />
                    </button>
                    <div className="card-body">
                        <h5 className="card-title">{item.nome}</h5>
                        <p>{item.descricao}</p>
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
                            <img src="/images/Logos/logo.png" alt="Ware Logo" style={{ width: '20%' }} />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ marginLeft: '-32%' }}>
                            <div className="navbar-nav">
                                <a className="nav-link text-white" href="/shop">Explore</a>
                                <a className="nav-link active text-white" href="/library">Management</a>
                            </div>
                        </div>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit" style={{ marginRight: '10px' }}>Search</button>
                        </form>
                        <a href="/" className="btn btn-primary">Log Out</a>
                    </div>
                </nav>
                {/* END NAVBAR */}
    
                <div className="container mt-3">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <button className={`btn btn-outline-primary ${type === 'softwares' ? 'active' : ''}`}
                                onClick={() => handleTypeChange('softwares')}>
                                Softwares
                            </button>
                        </div>
                        <div className="col-auto">
                            <button className={`btn btn-outline-primary ${type === 'addons' ? 'active' : ''}`}
                                onClick={() => handleTypeChange('addons')}>
                                Addons
                            </button>
                        </div>
                    </div>
                </div>
                <div className="container mt-5">
                    <div className="row">
                        {items.map(renderCard)}
                    </div>
                </div>
    
                {/* RECOMMENDATIONS */}
                <hr className="custom-hr" />
                <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Recommended for You</h1>
    
                <div id="carouselrecomendado" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row justify-content-center">
                                {/* Example recommendation cards */}
                                <div className="col-6 d-flex flex-column align-items-center">
                                    <div className="card card-custom mt-3" style={{ width: '70%', boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                        <div className="row no-gutters align-items-center">
                                            <div className="col-md-3">
                                                <img src="/images/newicons/asana.png" className="card-img" alt="..." />
                                            </div>
                                            <div className="col-md-8 d-flex justify-content-between align-items-center">
                                                <div className="card-body">
                                                    <p className="card-text">Communication</p>
                                                    <h5 className="card-title">Asana</h5>
                                                </div>
                                                <a href="/shop" className="btn btn-dark btn-sm" style={{ marginRight: '-15px' }}>Learn More</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* More examples can be added here */}
                            </div>
                        </div>
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
                {/* END RECOMMENDATIONS */}
    
                {/* FOOTER */}
                <footer className="footer bg-dark text-light">
                    <div className="container d-flex justify-content-center align-items-center">
                        <span className="text-center">&copy; Ware 2024</span>
                    </div>
                </footer>
                {/* END FOOTER */}
            </div>
        );
    };
    
    export default Shop;
    