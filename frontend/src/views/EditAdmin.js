// EditAdmin.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './editadmin.css';

const SoftwareUpdate = () => {
    const { idproduto } = useParams();
    const [software, setSoftware] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        versao: '',
        precoproduto: ''
    });
    const [error, setError] = useState('');
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
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };

            await axios.put(`http://localhost:3000/update/admin/${idproduto}`, software, config);

            window.alert('Software updated successfully!');
            navigate('/list/admin');
        } catch (error) {
            console.error('Error updating software:', error);
            setError('Error updating software.');
        }
    };

    const isLoggedIn = localStorage.getItem('token') !== null;

    if (!isLoggedIn) {
        return <div>You need to be logged in to access this page.</div>;
    }

    return (
        <div className="wrapper">
            <div className="row no-gutters">
                <div id="sidebar" className="col-md-3">
                    <div className="logo">
                        <img src="/images/Logos/logotipo copy.svg" alt="Logo" />
                    </div>
                    <ul className="list-unstyled components">
                        <li>
                            <a href="/tickets/admin"><i className="fas fa-ticket-alt"></i> Tickets</a>
                        </li>
                        <li>
                            <a href="/add/admin"><i className="fas fa-plus"></i> Add Software</a>
                        </li>
                        <li>
                            <a href="/list/admin"><i className="fas fa-list"></i> List Software</a>
                        </li>
                        <li>
                            <a href="#"><i className="fas fa-file-invoice-dollar"></i> Budgets</a>
                        </li>
                        <li>
                            <a href="#"><i className="fas fa-chart-line"></i> Sales Metrics</a>
                        </li>
                    </ul>
                </div>

                <div id="content" className="col-md-9">
                    <h2 style={{ marginBottom: '3%' }}>Update Software</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nome"
                                value={software.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                name="descricao"
                                value={software.descricao}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                className="form-control"
                                name="categoria"
                                value={software.categoria}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Version</label>
                            <input
                                type="text"
                                className="form-control"
                                name="versao"
                                value={software.versao}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                className="form-control"
                                name="precoproduto"
                                value={software.precoproduto}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Logo</label>
                            <input
                                type="file"
                                className="form-control"
                                name="logotipo"
                            />
                        </div>
                        <div className="form-group">
                            <label>Software Images</label>
                            <input
                                type="file"
                                className="form-control"
                                name="imagenssoftware"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SoftwareUpdate;
