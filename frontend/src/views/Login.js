import axios from 'axios';
import React, { useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function EditComponent() {
  const [email, setEmail] = useState('');
  const [codigopessoal, setCodigoPessoal] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', { email, codigopessoal }, { withCredentials: true });
      const { token } = response.data;
      console.log('Login successful', token);
      window.location.href = '/signup/comprador';
    } catch (error) {
      console.error('Login error', error);
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div class="loginpage" style={{ overflow: 'hidden' }}>
      {/* MENU BAR */}
      <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="/"><img src="images/Logos/logo.png" style={{ width: '20%' }} alt="Ware Logo" /></a>
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
      <div style={{ height: '100vh', overflow: 'hidden' }}>
        <section class="d-flex align-items-center justify-content-center" style={{ height: '100vh', overflow: 'hidden' }}>
          <div class="container-fluid" style={{ height: '100vh', overflow: 'hidden' }}>
            <div class="row" style={{ height: '100vh', overflow: 'hidden' }}>
              <div class="col-sm-6 text-black" style={{ height: '100vh', overflow: 'hidden' }}>
                <div class="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  <form style={{ width: '23rem', marginTop: '20%' }} onSubmit={handleLogin}>
                    <h3 class="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>
                    <div class="form-outline mb-4">
                      <input
                        type="email"
                        id="form2Example17"
                        class="form-control form-control-lg"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label class="form-label" htmlFor="form2Example17">Endereço de email</label>
                    </div>
                    <div class="form-outline mb-4">
                      <input
                        type="password"
                        id="form2Example27"
                        class="form-control form-control-lg"
                        value={codigopessoal}
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
              <div class="col-sm-6 d-flex align-items-center justify-content-center" style={{ padding: 0, margin: 0 }}>
                <img src="images/fundos/fundo branco.jpg" alt="fundo branco" style={{ width: 'auto', height: '100vh', objectFit: 'cover' }} />
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
