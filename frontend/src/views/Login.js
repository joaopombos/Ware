import axios from 'axios';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../CSS/ware.css';


export default function EditComponent() {
  const [email, setEmail] = useState('');
  const [codigopessoal, setCodigoPessoal] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', { email, codigopessoal }, {
        withCredentials: true // Se necessário
      });
      const { token } = response.data;
      console.log('Login successful', token);

      // Armazenar o token no localStorage
      localStorage.setItem('token', token);

      // Redirecionar para a página desejada após o login
      navigate('/signup/comprador');
    } catch (error) {
      console.error('Login error', error);
      if (error.response && error.response.data) {
        setError(error.response.data.error || 'An unexpected error occurred');
      } else if (error.message === 'Network Error') {
        setError('Erro de rede. Verifique sua conexão ou tente novamente mais tarde.');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div class="loginpage">
      {/* MENU BAR */}
      <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"><img class="warelogo" src="images/Logos/logo.png" alt="Ware Logo" /></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          </div>
          <button class="btn btn-outline-light me-2" type="button">Iniciar Sessão</button>
        </div>
      </nav>
      {/* FIM MENU BAR */}

      {/* LOG IN FORM */}
      <div class="logform">
        <section class="d-flex align-items-center justify-content-center">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-6 text-black">
                <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  <form class="actform" onSubmit={handleLogin}>
                    <h3 class="fw-normal mb-3 pb-3">Log in</h3>
                    <div class="form-outline mb-4">
                      <input class="form-control form-control-lg" type="email" id="form2Example17" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label class="form-label" htmlFor="form2Example17">Endereço de email</label>
                    </div>
                    <div class="form-outline mb-4">
                      <input class="form-control form-control-lg" type="password" id="form2Example27" value={codigopessoal}
                        onChange={(e) => setCodigoPessoal(e.target.value)}
                      />
                      <label class="form-label" htmlFor="form2Example27">Código</label>
                    </div>
                    {error && <div class="alert alert-danger">{error}</div>}
                    <div class="pt-1 mb-4">
                      <button class="btn btn-info btn-lg btn-dark" type="submit">Login</button>
                    </div>
                    <p class="small mb-5 pb-lg-2"><a class="text-muted" href="/loginAdmin">Tem Conta Admin?</a></p>
                    <p>Não tem conta? <a href="/signin/tipo" class="link-info">Crie uma aqui.</a></p>
                  </form>
                </div>
              </div>
              <div class="col-sm-6 d-flex align-items-center justify-content-center">
                <img class="sideimg" src="images/fundos/fundo branco.jpg" alt="image" />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* FIM LOG IN FORM */}

      {/* FOOTER */}
      <footer class="footer bg-dark text-light fixed-bottom">
        <div class="container d-flex justify-content-center align-items-center">
          <span class="text-center">&copy; Ware 2024</span>
        </div>
      </footer>
      {/* FIM FOOTER */}
    </div>
  );
}
