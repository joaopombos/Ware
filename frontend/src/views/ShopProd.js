import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './ShopProd.css'; // Ensure you have the necessary CSS for the slider
import { Modal, Button, Form, Table } from 'react-bootstrap';

export default function ShopProd() {
    const [images, setImages] = useState([]); // State for storing image URLs
    const imageListRef = useRef(null); // Reference to the image list container
    const thumbRef = useRef(null); // Reference to the scrollbar thumb
    const [showhistModal, setShowhistModal] = useState(false); // State for modal visibility
    const [showorcModal, setShoworcModal] = useState(false); // State for modal visibility

    // Function to toggle additional text visibility
    const toggleText = () => {
        const textContainer = document.getElementById('textContainer');
        const expandButton = document.getElementById('expandButton');
        if (textContainer.style.display === 'none') {
            textContainer.style.display = 'block';
            expandButton.innerText = 'Ver menos';
        } else {
            textContainer.style.display = 'none';
            expandButton.innerText = 'Ver mais';
        }
    }



    const handleModalhistOpen = () => {
        setShowhistModal(true);
    };

    const handleModalhistClose = () => {
        setShowhistModal(false);
    };

    const handleModalorcOpen = () => {
        setShoworcModal(true);
    };

    const handleModalorcClose = () => {
        setShoworcModal(false);
    };

    // Fetch images from API when the component mounts
    useEffect(() => {
        axios.get('http://localhost:3000/api/images')
            .then(res => {
                setImages(res.data); // Update state with fetched images
            })
            .catch(err => {
                console.log(err); // Log errors to the console
            });
    }, []);

    const handlePrevSlide = () => {
        const currentScrollLeft = imageListRef.current.scrollLeft;
        imageListRef.current.scrollTo({
            left: currentScrollLeft - imageListRef.current.clientWidth,
            behavior: 'smooth'
        });
    };

    const handleNextSlide = () => {
        const currentScrollLeft = imageListRef.current.scrollLeft;
        imageListRef.current.scrollTo({
            left: currentScrollLeft + imageListRef.current.clientWidth,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const resizeObserver = new ResizeObserver(() => {
            const newThumbWidth = (imageListRef.current.clientWidth / imageListRef.current.scrollWidth) * thumbRef.current.clientWidth;
            thumbRef.current.style.width = `${newThumbWidth}px`;
        });
        resizeObserver.observe(imageListRef.current);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    const handleButtonClick = (url) => {
        window.location.href = url;
    };

    const renderCard = () => (
        <div className="col-sm-2">
            <div className="card">
                <button className="btn-img" onClick={() => handleButtonClick("licensecompgestor.html")}>
                    <img src="/images/Logos/figma.png" className="card-img-top" alt="..." />
                </button>
                <div className="card-body">
                    <h5 className="card-title">Nome Software</h5>
                    <p className="card-text">Licenças</p>
                </div>
            </div>
        </div>
    );

    /*
    Explanation:
        State Initialization: const [images, setImages] = useState([]);

            images is the state variable to store the array of image URLs.
            setImages is the function used to update the images state.

        Fetching Images:

            Inside useEffect, axios.get('http://localhost:3000/api/images') fetches the images from the API.
            On success, res.data (which contains the image URLs) is used to update the images state with setImages(res.data);.
            On failure, the error is logged to the console.
            
        Rendering Images:

            The images array is mapped over to render each image inside an <li> element.
            The src attribute of the <img> tag is set to the URL of the image.
            
        Slider Navigation:
            handlePrevSlide and handleNextSlide functions update the scrollLeft property of the imageListRef container to navigate through the images.

    This setup ensures that the images are dynamically fetched from the API and displayed in the slider. Adjust the API endpoint (http://localhost:3000/api/images) and image URLs as per your project's requirements.
*/

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src="/images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
                    <button className="btn btn-outline-light me-2" type="button">Iniciar Sessão</button>
                </div>
            </nav>
            <div style={{ border: 'none', backgroundColor: 'transparent', marginLeft: '4%', marginTop: '4%', marginBottom: '4%' }}>
                <div className="row no-gutters align-items-center">
                    <div className="col-md-2">
                        <img src="/images/Logos/figma.png" className="card-img" alt="..." />
                    </div>
                    <div className="col-md-10 d-flex justify-content-between align-items-center">
                        <div className="card-body" style={{ marginLeft: '3%' }}>
                            <h2 className="card-title">Nome Software</h2>
                            <h4 className="card-text">Categoria</h4>
                            <p className="card-text">Programador</p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center" style={{ marginLeft: 'auto', paddingRight: '10%' }}>
                        <a className="btn btn-outline-danger btn-sm" href="/shop/:idvenda/confirm" role="button">Comprar</a>

                            <p className="mb-0 ms-2">€</p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="custom-hr" />

            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Pré-visualização</h1>

            <div className="container">
                <div className="slider-wrapper">
                    <button id="prev-slide" className="slide-button material-symbols-rounded" onClick={handlePrevSlide}>
                        <i className="bi bi-chevron-left" style={{ color: 'white' }}></i>
                    </button>
                    <ul className="image-list" ref={imageListRef}>
                        {images.map((image, index) => (
                            <li key={index} className="image-item">
                                <img src={image} alt={`img-${index + 1}`} />
                            </li>
                        ))}
                    </ul>
                    <button id="next-slide" className="slide-button material-symbols-rounded" onClick={handleNextSlide}>
                        <i className="bi bi-chevron-right" style={{ color: 'white' }}></i>
                    </button>
                </div>
                <div className="slider-scrollbar">
                    <div className="scrollbar-track">
                        <div className="scrollbar-thumb" ref={thumbRef}></div>
                    </div>
                </div>
            </div>

            <hr className="custom-hr" />

            <div id="contentContainer" style={{ marginTop: '5%', marginBottom: '-3%', marginLeft: '5%', marginRight: '5%' }}>
                <p id="initialText" style={{ display: 'block' }}>
                    O Adobe Illustrator é um software de design gráfico amplamente utilizado para a criação de ilustrações
                    vetoriais, logotipos, ícones, tipografias e complexas obras de arte digitais. Entre suas principais
                    funcionalidades, destacam-se as ferramentas de desenho vetorial, que permitem criar formas precisas e
                    escaláveis sem perda de qualidade. O Illustrator oferece uma ampla gama de pincéis e efeitos que permitem
                    adicionar texturas e profundidade às ilustrações.
                </p>
                <div id="textContainer" style={{ display: 'none' }}>
                    <p>Além disso, possui recursos avançados de tipografia, que possibilitam manipular fontes e texto de
                        maneiras criativas e detalhadas. A integração com outros aplicativos da Adobe Creative Cloud, como
                        Photoshop e InDesign, facilita o fluxo de trabalho entre diferentes tipos de projetos e plataformas. Com
                        ferramentas como a criação de padrões, gradientes, malhas e edição de cores, o Adobe Illustrator é uma
                        escolha essencial para designers profissionais que buscam versatilidade e precisão em seus trabalhos.
                    </p>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-dark" id="expandButton" onClick={toggleText}>Ver mais</button>
                </div>
            </div>

            <hr className="custom-hr" style={{ marginTop: '5%' }} />

            <div className="d-flex justify-content-between align-items-center" style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%', marginBottom: '5%' }}>
                <h1>Novidades</h1>
                <button className="text-end btn btn-outline-dark" onClick={handleModalhistOpen}>Histórico</button>
            </div>

            <Modal show={showhistModal} onHide={handleModalhistClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Histórico</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Conteúdo do histórico...</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalhistClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="d-flex justify-content-between align-items-center">
                <ul style={{ marginLeft: '10%' }}>
                    <li>Bug fixes.</li>
                    <li>Performance improvements.</li>
                </ul>
                <span className="text-end" style={{ marginRight: '5%' }}>Versão</span>
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
                    <p className="text-center" style={{ color: 'white' }}>Se o que procura não está representado em cima, peça um orçamento <a href="#"  onClick={handleModalorcOpen} className="text-light"><span className="text-dark" >aqui</span></a>.</p>
                 </div>
             </div>

             <Modal show={showorcModal} onHide={handleModalorcClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Preencha o seguinte formulário:</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Primeiro e último nome</Form.Label>
                                <Form.Control type="text" id="textBox1" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" id="textBox2" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mensagem</Form.Label>
                                <Form.Control type="text" id="textBox3" />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Procurar software</Form.Label>
                                <div className="input-group">
                                    <Form.Control type="text" id="searchBox" />
                                    <Button variant="outline-secondary" id="searchButton">Adicionar</Button>
                                </div>
                            </Form.Group>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Software</th>
                                        <th>Quantidade</th>
                                        <th>Selecionar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleModalorcClose}>Enviar</Button>
            </Modal.Footer>
        </Modal>

            <hr className="custom-hr" />

            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Avaliações</h1>


            <div class="row" style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                <div class="col-md-3 mb-4">
                    <div class="card" style={{ marginBottom: '5%', width: '18rem' }}>
                        <img src="/images/icons/aspas.png" class="card-img-top img-fluid mx-auto d-block" style={{ width: '75%', margintop: '30px' }} alt="..." />
                        <div class="card-body text-center">
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                est id, tristique viverra mauris. </p>
                            <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                            <p class="card-text mb-2">Categoria</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-4">
                    <div class="card" style={{ marginBottom: '5%', width: '18rem' }}>
                        <img src="/images/icons/aspas.png" class="card-img-top img-fluid mx-auto d-block" style={{ width: '75%', margintop: '30px' }} alt="..." />
                        <div class="card-body text-center">
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                est id, tristique viverra mauris. </p>
                            <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                            <p class="card-text mb-2">Categoria</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 mb-4">
                    <div class="card" style={{ marginBottom: '5%', width: '18rem' }}>
                        <img src="/images/icons/aspas.png" class="card-img-top img-fluid mx-auto d-block" style={{ width: '75%', margintop: '30px' }} alt="..." />
                        <div class="card-body text-center">
                            <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nisi lacus, venenatis at
                                est id, tristique viverra mauris. </p>
                            <p class="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                            <p class="card-text mb-2">Categoria</p>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="custom-hr" />

            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Mais deste programador</h1>

            <div className="container" style={{ marginBottom: '5%' }}>
                <div className="row">
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                    {renderCard()}
                </div>
            </div>

            <footer class="footer bg-dark text-light">
                <div class="container d-flex justify-content-center align-items-center">
                    <span class="text-center">&copy; Ware 2024</span>
                 </div>
             </footer>
        </>
    );
}
