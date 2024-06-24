import axios from 'axios';
import React, { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function EditComponent() {
    const [campTitulo, setCampTitulo] = useState("");
    const [campDescricao, setCampDescricao] = useState("");
    const [campFoto, setCampFoto] = useState("");
    const [selectGeneroId, setSelectGeneroId] = useState("");

    const handleFotoChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fotoBase64 = reader.result;
                setCampFoto(fotoBase64);
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div>
            {/* NAVBAR */}
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#"><img src="images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup"></div>
                    <a href="/login">
                        <button className="btn btn-outline-light me-2" type="button">
                            Iniciar Sessão
                        </button>
                    </a>
                </div>
            </nav>
            {/* FIM NAVBAR */}

            {/* TITULO */}
            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Os mais vendidos</h1>

            {/* CARROSSEL OS MAIS VENDIDOS */}
            <div id="carouselmaisvendidos" className="carousel slide mx-auto" data-bs-ride="carousel" style={{ maxWidth: '90%' }}>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row justify-content-center">
                            <div className="col-md-3">
                                <div className="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', width: '18rem' }}>
                                    <img src="images/mais_vendidos/Illustrator.jpg" className="card-img-top img-fluid" alt="Adobe Illustrator" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">Adobe Illustrator</h5>
                                        <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p className="card-text mb-2" style={{ color: 'grey' }}>Design</p>
                                        <p className="card-text">De ilustrações a logotipos, tenha todas as ferramentas necessárias para seus projetos de design gráfico.</p>
                                        <a href="/shop/:idproduto/" className="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', width: '18rem' }}>
                                    <img src="images/mais_vendidos/Davinci.jpg" className="card-img-top img-fluid" alt="DaVinci Resolve" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">DaVinci Resolve</h5>
                                        <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p className="card-text mb-2" style={{ color: 'grey' }}>Edição de Vídeo</p>
                                        <p className="card-text">A ferramenta mais poderosa de Hollywood para edição profissional em pós-edição de áudio!</p>
                                        <a href="/shop/:idproduto/" className="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', width: '18rem' }}>
                                    <img src="images/mais_vendidos/Sketchup.jpg" className="card-img-top img-fluid" alt="SketchUp" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">SketchUp</h5>
                                        <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p className="card-text mb-2" style={{ color: 'grey' }}>Modelagem 3D</p>
                                        <p className="card-text">Dê vida aos seus conceitos mais loucos e reimagine o que é possível fazer, tudo num software.</p>
                                        <a href="/shop/:idproduto/" className="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row justify-content-center">
                            <div className="col-md-3">
                                <div className="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', width: '18rem' }}>
                                    <img src="images/mais_vendidos/Zoom.jpg" className="card-img-top img-fluid" alt="Zoom" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">Zoom</h5>
                                        <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p className="card-text mb-2" style={{ color: 'grey' }}>Produtividade</p>
                                        <p className="card-text">Uma plataforma para conexões humanas ilimitadas. Conecte-se com amigos e colegas através de videoconferências.</p>
                                        <a href="/shop/:idproduto/" className="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', width: '18rem' }}>
                                    <img src="images/mais_vendidos/VisualStudio.jpg" className="card-img-top img-fluid" alt="Microsoft Excel" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">Microsoft Excel</h5>
                                        <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p className="card-text mb-2" style={{ color: 'grey' }}>Planilhas</p>
                                        <p className="card-text">A ferramenta essencial para criar, organizar e analisar dados com precisão. Domine seus dados com facilidade.</p>
                                        <a href="/shop/:idproduto/" className="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="card mb-3" style={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none', width: '18rem' }}>
                                    <img src="images/mais_vendidos/Wordpress.jpg" className="card-img-top img-fluid" alt="AutoCAD" />
                                    <div className="card-body">
                                        <h5 className="card-title mb-2">AutoCAD</h5>
                                        <p className="estrelas mb-2">&#9733; &#9733; &#9733; &#9733; &#9733;</p>
                                        <p className="card-text mb-2" style={{ color: 'grey' }}>Desenho Técnico</p>
                                        <p className="card-text">A ferramenta de design assistido por computador mais poderosa do mercado, com precisão de engenharia.</p>
                                        <a href="/shop/:idproduto/" className="btn btn-dark w-100">Saber mais</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselmaisvendidos" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselmaisvendidos" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            {/* FIM CARROSSEL OS MAIS VENDIDOS */}



            <hr class="custom-hr" />

            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Últimas atualizações</h1>

            <div id="carouselatualizacoes" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <div class="row justify-content-center">
                            <div class="col-6 d-flex flex-column align-items-center">
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="images/newicons/excel.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Microsoft Excel</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="images/newicons/asana.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Comunicação</p>
                                                <h5 class="card-title">Asana</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-column align-items-center" style={{ marginleft: '-5%' }}>
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="images/newicons/dropbox.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtivade</p>
                                                <h5 class="card-title">DropBox</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="images/newicons/miro.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Comunicação</p>
                                                <h5 class="card-title">Miro</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="row justify-content-center">
                            <div class="col-6 d-flex flex-column align-items-center">
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="images/newicons/notion.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtivade</p>
                                                <h5 class="card-title">Notion</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="images/newicons/fcp.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Vídeo</p>
                                                <h5 class="card-title">Final Cut Pro</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-flex flex-column align-items-center" style={{ marginleft: '-5%' }}>
                                <div class="card card-custom" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="images/newicons/office.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Office 365</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card card-custom mt-3" style={{ width: '70%', boxshadow: '5px 0 10px rgba(0, 0, 0, 0.1)', border: 'none' }}>
                                    <div class="row no-gutters align-items-center">
                                        <div class="col-md-3">
                                            <img src="images/newicons/slack.png" class="card-img" alt="..." />
                                        </div>
                                        <div class="col-md-8 d-flex justify-content-between align-items-center">
                                            <div class="card-body">
                                                <p class="card-text">Produtividade</p>
                                                <h5 class="card-title">Slack</h5>
                                            </div>
                                            <a href="/shop/:idproduto/" class="btn btn-dark btn-sm" style={{ marginright: '-15px' }}>Saber mais</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselatualizacoes" data-bs-slide="prev" >
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselatualizacoes" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>


            <hr class="custom-hr" />


            <h1 style={{ marginLeft: '5%', marginTop: '5%', marginBottom: '5%' }}>Avaliações</h1>


            <div class="row" style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                <div class="col-md-3 mb-4">
                     <div class="card" style={{ marginBottom: '5%', width: '18rem' }}>
                        <img src="images/icons/aspas.png" class="card-img-top img-fluid mx-auto d-block" style={{ width: '75%', margintop: '30px' }} alt="..." />
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
                        <img src="images/icons/aspas.png" class="card-img-top img-fluid mx-auto d-block" style={{ width: '75%', margintop: '30px' }} alt="..." />
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
                        <img src="images/icons/aspas.png" class="card-img-top img-fluid mx-auto d-block" style={{ width: '75%', margintop: '30px' }} alt="..." />
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
        </div>
    );

}