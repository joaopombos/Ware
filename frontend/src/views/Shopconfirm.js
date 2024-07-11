import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Shopconfirm = () => {
    let { idvenda } = useParams();
    const navigate = useNavigate();

    // Função para redirecionar para /shop
    const handleRedirect = () => {
        navigate('/shop');
    };

    return (
        <div>
            <h2>Compra Cancelada {idvenda}</h2>
            {/* Botão para redirecionar para /shop */}
            <button onClick={handleRedirect}>Voltar para a Loja</button>
        </div>
    );
};

export default Shopconfirm;


