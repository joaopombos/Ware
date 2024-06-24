import axios from 'axios';
import React, { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function Sign_gestor() {
   const [email, setEmail] = useState('');
   const [name, setName] = useState('');
   const [company, setAddress] = useState('');

   const handleSubmit = async (e) => {
       e.preventDefault();
       try {
           await axios.post('/create-company', {
               name,
               company,
               email
           });
           alert('Conta criada com sucesso');
       } catch (error) {
           console.error(error);
           alert('Error ao criar conta');
       }
   };

    return (
       <div>
           <nav class="navbar navbar-expand-lg bg-dark">
               <div class="container-fluid">
                   <a class="navbar-brand" href="#"><img src="/images/Logos/logo.png" style={{width:'20%'}} alt="ware logo"/></a>
                   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                       aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                   </button>
                   <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    </div>
                   <button class="btn btn-outline-light me-2" type="button">Iniciar Sessão</button>
                </div>
           </nav>
           <div class="row">
               <div class="col-sm-6" style={{alignItems: 'center', height: '100vh'}}>
                   <img src="/images/fundos/fundopreto.jpg" class="img-fluid" alt="fundo preto" style={{height: '100%', objectFit: 'cover'}}/>
               </div>
               <div class="col-sm-6 text-black">
                   <div class=" align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                       <form onSubmit={handleSubmit} class="form-signin" style={{width: '23rem', marginTop: '20%'}}>
                           <h3 class="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Criar conta</h3>
                           <p style={{color: '#B3B3B3'}} >Todos os campos são obrigatórios.</p>
                           <div class="form-outline mb-4">
                               <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} class="form-control form-control-lg" />
                               <label class="form-label" for="name">Primeiro e Último nome</label>
                            </div>
                           <div class="form-outline mb-4">
                               <input type="text" id="name" value={company} onChange={(e) => setName(e.target.value)} class="form-control form-control-lg" />
                               <label class="form-label" for="name">Nome Empresa</label>
                            </div>
                           <div class="form-outline mb-4">
                               <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control form-control-lg" />
                               <label class="form-label" for="email">Endereço de email</label>
                           </div> 
                           <div class="form-check">
                               <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                               <label class="form-check-label" for="flexCheckDefault">
                                   Aceitar os termos de uso.
                               </label>
                           </div>
                           <div class="pt-1 mb-4" style={{marginTop: '5%'}}>
                               <button class="btn btn-info btn-lg btn-dark" type="submit">Enviar código</button>
                           </div>
                           <p>Já tem conta? <a href="#!" class="link-info">Clique aqui.</a></p>
                       </form>
                    </div>
                </div>
           </div>

           <footer class="footer bg-dark text-light fixed-bottom">
                <div class="container d-flex justify-content-center align-items-center">
                    <span class="text-center">&copy; Ware 2024</span>
                 </div>
             </footer>
       </div>
   );
}