import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

 
 export default function ShopProd() {
     const [images, setImages] = useState([]);
     const imageListRef = useRef(null);
     const thumbRef = useRef(null);
     const textContainer = document.getElementById('textContainer');
     const expandButton = document.getElementById('expandButton');
    const [showModal, setShowModal] = useState(false);
 
     function toggleText() {
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
 
     useEffect(() => {
         axios.get('http://localhost:3000/api/images')
             .then(res => {
                 setImages(res.data);
             })
             .catch(err => {
                 console.log(err);
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
             const newThumbWidth = (imageListRef.current.scrollWidth / imageListRef.current.clientWidth) * thumbRef.current.clientWidth;
             thumbRef.current.style.width = `${newThumbWidth}px`;
         });
         resizeObserver.observe(imageListRef.current);
         return () => {
             resizeObserver.disconnect();
         };
     }, []);
 
     return (
        <><nav class="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"><img src="images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" /></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    </div>
                    <button class="btn btn-outline-light me-2" type="button">Iniciar Sessão</button>

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
                         <div className="d-flex justify-content-start align-items-center"
                             style={{ marginLeft: 'auto', paddingRight: '10%' }}>
                             <button className="btn btn-outline-danger btn-sm">Comprar</button>
                             <p className="mb-0 ms-2">€</p>
                         </div>
                     </div>
                 </div>
             </div>
 
             <hr class="custom-hr" />
 
             <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Pré-visualização</h1>
 
             <div className="container">
                 <div className="slider-wrapper">
                     <button id="prev-slide" className="slide-button material-symbols-rounded" onClick={handlePrevSlide}>
                         <i className="bi bi-chevron-left" style={{ color: 'white' }}></i>
                     </button>
                     <ul className="image-list" ref={imageListRef}>
                         {images.map((image, index) => (
                             <img key={index} className="image-item" src={image} alt={`img-${index + 1}`} />
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
             <hr class="custom-hr" />
 
             <div id="contentContainer" style={{ marginTop: '5%', marginBottom: '-3%' }}>
                 <p id="initialText" style={{ display: 'block' }}>
                     O Adobe Illustrator é um software de design gráfico amplamente utilizado para a criação de ilustrações
                     vetoriais, logotipos, ícones, tipografias e complexas obras de arte digitais. Entre suas principais
                     funcionalidades, destacam-se as ferramentas de desenho vetorial, que permitem criar formas precisas e
                     escaláveis sem perda de qualidade. O Illustrator oferece uma ampla gama de pincéis e efeitos que permitem
                     adicionar texturas e profundidade às ilustrações. </p>
                 <div id="textContainer" style={{ display: 'none' }}>
                     <p>Além disso, possui recursos avançados de tipografia, que possibilitam manipular fontes e texto de
                         maneiras criativas e detalhadas. A integração com outros aplicativos da Adobe Creative Cloud, como
                         Photoshop e InDesign, facilita o fluxo de trabalho entre diferentes tipos de projetos e plataformas. Com
                         ferramentas como a criação de padrões, gradientes, malhas e edição de cores, o Adobe Illustrator é uma
                         escolha essencial para designers profissionais que buscam versatilidade e precisão em seus trabalhos.
                     </p>
                 </div>
                 <div class="buttonContainer">
                     <button class="btn btn-outline-dark" id="expandButton" onClick={toggleText}>Ver mais</button>
                 </div>
             </div>
 
             <hr class="custom-hr" />
 
            <div class="d-flex justify-content-between align-items-center"
                 style={{ marginLeft: '5%', marginRight: '5%', marginTop: '5%', marginBottom: '5%' }}>
                <h1>Novidades</h1>
                <button class="text-end btn btn-outline-dark" onClick={handleModalOpen}>Histórico</button>
            </div>


        </>
    );

}
 

