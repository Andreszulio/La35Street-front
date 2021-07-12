import React, { useState, useEffect } from 'react';
import Client from '../components/Client';
import NavBar from '../components/NavBar';
import { urls } from '../environment/urls';
import axios from '../environment/axiosConfig';

const ManageClients = () => {

    const [clients, setClients] = useState([]);

    const getClients = () => {
        axios.get(urls.findUser)
        .then((response)=>{
            setClients(response.data);
        });
    }
    useEffect(()=>{
        getClients();
    },[])
    return (
        <div>
            <NavBar />
            <div className="manage-client">
                {
                    clients&&clients.map((client)=>(
                        <Client key={client.clientId} client={client}/>
                    ))
                }
            </div>
        </div>
    );
}

export default ManageClients;