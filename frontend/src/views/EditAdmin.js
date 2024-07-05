import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/editadmin.css';

const SoftwareUpdate = () => {
    const { idproduto } = useParams();
    const [software, setSoftware] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        versao: '',
        precoproduto: ''
    });
    const [logotipo, setLogotipo] = useState(null);
    const [imagenssoftware, setImagensSoftware] = useState(null);
    const [, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSoftware = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3000/edit/admin/${idproduto}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                setSoftware(response.data);
            } catch (error) {
                console.error('Error fetching software:', error);
                setError('Error fetching software.');
            }
        };

        fetchSoftware();
    }, [idproduto]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSoftware(prevSoftware => ({
            ...prevSoftware,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');

            const convertToBase64 = (file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            };

            let logotipoBase64 = null;
            if (logotipo) {
                logotipoBase64 = await convertToBase64(logotipo);
            }

            let imagenssoftwareBase64 = null;
            if (imagenssoftware) {
                imagenssoftwareBase64 = await convertToBase64(imagenssoftware);
            }

            const updateData = {
                ...software,
                logotipo: logotipoBase64,
                imagenssoftware: imagenssoftwareBase64,
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };

            await axios.put(`http://localhost:3000/update/admin/${idproduto}`, updateData, config);

            window.alert('Software updated successfully!');
            navigate('/list/admin');
        } catch (error) {
            console.error('Error updating software:', error);
            setError('Error updating software.');
        }
    };

    const handleLogotipoChange = (e) => {
        setLogotipo(e.target.files[0]);
    };

    const handleImagensSoftwareChange = (e) => {
        setImagensSoftware(e.target.files[0]);
    };

    const isLoggedIn = localStorage.getItem('token') !== null;

    if (!isLoggedIn) {
        return <div>You need to be logged in to access this page.</div>;
    }

    return (
        <div className="body-container">
            <div id="sidebar">
                <div className="logo">
                    <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
                </div>
                <ul className="components">
                    <li>
                        <a href="/add/admin"><i className="fas fa-plus"></i> Adicionar Software/Addon</a>
                    </li>
                    <li>
                        <a href="/list/admin"><i className="fas fa-list"></i> Listar Softwares/Addons</a>
                    </li>
                    <li>
                        <a href="/budget/admin"><i className="fas fa-file-invoice-dollar"></i> Orçamentos</a>
                    </li>
                    <li>
                        <a href="/metrics/admin/"><i className="fas fa-chart-line"></i> Métricas de vendas</a>
                    </li>
                </ul>
                <div className="logout-button">
                    <a href="/" className="btn btn-primary">Terminar Sessão</a>
                </div>
            </div>

            <div id="content">
                <h2>Update Software</h2>
                <div className="form-container">
                    <div className="row">
                        <div className="col-md-6">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" name="nome" value={software.nome} onChange={handleChange} placeholder="Nome" />
                            <label htmlFor="descricao" className="mt-3">Descrição</label>
                            <textarea className="form-control" id="descricao" name="descricao" value={software.descricao} onChange={handleChange} rows="3" placeholder="Descrição"></textarea>
                            <label htmlFor="categoria" className="mt-3">Categoria</label>
                            <input type="text" className="form-control" id="categoria" name="categoria" value={software.categoria} onChange={handleChange} placeholder="Categoria" />
                            <label htmlFor="versao" className="mt-3">Versão do Software</label>
                            <input type="text" className="form-control" id="versao" name="versao" value={software.versao} onChange={handleChange} placeholder="Versão do Software" />
                            <label htmlFor="precoproduto" className="mt-3">Preço</label>
                            <input type="text" className="form-control" id="precoproduto" name="precoproduto" value={software.precoproduto} onChange={handleChange} placeholder="Preço" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="logotipo" className="mt-3">Logotipo</label>
                            <div className="file-upload-container">
                                <input type="file" id="logotipo" className="form-control-file" onChange={handleLogotipoChange} />
                                <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                                <button className="btn btn-primary">Selecionar arquivo</button>
                            </div>
                            <label htmlFor="imagenssoftware" className="mt-3">Imagens do Software</label>
                            <div className="file-upload-container">
                                <input type="file" id="imagenssoftware" className="form-control-file" onChange={handleImagensSoftwareChange} />
                                <p>JPG, PNG ou PDF, tamanho máximo de 10MB</p>
                                <button className="btn btn-primary">Selecionar arquivo</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 text-end">
                            <button className="btn btn-danger" onClick={handleSubmit}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SoftwareUpdate;




