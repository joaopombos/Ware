import React from 'react';
import { useParams } from 'react-router-dom';

const Shopconfirm = () => {
    let { idvenda } = useParams();

    // Lógica para confirmar a compra antes de redirecionar para o checkout

    return (
        <div>
            <h2>Confirmação da Compra {idvenda}</h2>
            {/* Lógica de confirmação e botão para proceder ao checkout */}
        </div>
    );
}

export default Shopconfirm;

