import axios from 'axios';
import React, { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';
export default function Sign_sucess() {
    return (
        <div>
            {/* MENU BAR */}
            <nav class="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                        <img src="images/Logos/logo.png" alt="Ware Logo" />
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    </div>
                    <button class="btn btn-outline-light me-2" type="button">Iniciar Sessão</button>
                </div>
            </nav>

             {/* LOG IN FORM */}
            <section class="vh-100 d-flex" style={{ width: "100%" }}>
                <div class="col-sm-6 text-black" style={{ width: "50%", height: "100vh", backgroundImage: "url('images/fundos/fundo preto.png')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
                 <div class="col-sm-6 text-black" style={{ width: "50%" }}>
                     <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                        <form style={{ width: "23rem", marginTop: "30%" }}>
                             <i class="bi bi-check2-circle" style={{ fontSize: "5em", alignContent: "center" }}></i>
                             <h1 class="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px" }}>Sucesso!</h1>
                             <div class="form-outline mb-4">
                                 <input type="text" id="form2Example17" class="form-control form-control-lg" />
                                 <label class="form-label" for="form2Example17">Código</label>
                              </div>
                             <p style={{ color: "#B3B3B3" }}>
                                 Foi enviado um email para email@domain.com. Por favor introduza o código que recebeu para poder concluir o processo de criação de conta.
                             </p>
                             <div class="pt-1 mb-4" style={{ marginTop: "5%" }}>
                                 <button class="btn btn-info btn-lg btn-dark" type="button">Continuar</button>
                             </div>
                         </form>
                      </div>
                  </div>
             </section>
            {/* FOOTER */}
            <footer class="footer fixed-bottom bg-dark text-light text-center">
                <div class="container">
                    <span>&copy; Ware 2024</span>
                </div>
            </footer>
        </div>
    );
}
