import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './ShopProd.css'; // Ensure you have the necessary CSS for the slider
import { Modal, Button } from 'react-bootstrap';

export default function ShopProd() {
    const [images, setImages] = useState([]); // State for storing image URLs
    const imageListRef = useRef(null); // Reference to the image list container
    const thumbRef = useRef(null); // Reference to the scrollbar thumb
    const [showModal, setShowModal] = useState(false); // State for modal visibility

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

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
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
                    <a className="navbar-brand" href="#"><img src="images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" /></a>
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
                        <img src="images/Logos/figma.png" className="card-img" alt="..." />
                    </div>
                    <div className="col-md-10 d-flex justify-content-between align-items-center">
                        <div className="card-body" style={{ marginLeft: '3%' }}>
                            <h2 className="card-title">Nome Software</h2>
                            <h4 className="card-text">Categoria</h4>
                            <p className="card-text">Programador</p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center" style={{ marginLeft: 'auto', paddingRight: '10%' }}>
                            <button className="btn btn-outline-danger btn-sm">Comprar</button>
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

            <div id="contentContainer" style={{ marginTop: '5%', marginBottom: '-3%' }}>
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
                <div className="buttonContainer">
                    <button className="btn btn-outline-dark" id="expandButton" onClick={toggleText}>Ver mais</button>
                </div>
            </div>

            <hr className="custom-hr" />

            <div className="d-flex justify-content-between align-items-center" style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%', marginBottom: '5%' }}>
                <h1>Novidades</h1>
                <button className="text-end btn btn-outline-dark" onClick={handleModalOpen}>Histórico</button>
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Histórico</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Conteúdo do histórico...</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
