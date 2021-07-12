import React from 'react';

const Client = ({ client }) => {

    return (
        <div className="client-container">
            <i className="far fa-user-circle"></i>
            <h4>{client.clientName}</h4>
            <p>{client.clientEmail}</p>
            <p>{client.clientTelephone==='null'?'Sin número':client.clientTelephone}</p>
            <p>{client.clientAddress==='null'?'Sin dirección':client.clientAddress}</p>
            <p>{client.rol==='admin'?'Administrador':'Cliente'}</p>
        </div>
    );
}

export default Client;