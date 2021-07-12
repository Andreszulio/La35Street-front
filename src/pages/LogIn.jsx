import React, { useState } from 'react';
import { signInWithGoogle, auth } from '../functions/authFunctions';
import { useHistory } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { urls } from '../environment/urls';
import { saveToLocal } from '../functions/localStorage';
import { v4 as uuidv4 } from 'uuid';
import axios from '../environment/axiosConfig';

const LogIn = () => {

    const history = useHistory();
    const [user] = useAuthState(auth);
    const [rol, setRol] = useState("client");

    const findUser = () => {
        axios.get(urls.findUserById(user?.uid))
            .then((response) => {
                if (response.status === 200) {
                    saveToLocal('user-rol', response.data.rol);
                    saveToLocal('user-photo', user?.photoURL);
                    createPurchase();
                }
            }).catch((error) => {
                createUser();
            });
    }

    const createUser = () => {
        axios.post(urls.createUser(user?.uid, user?.displayName, null, user?.email, user?.phoneNumber, rol))
            .then((response) => {
                if (response.status === 200) {
                    saveToLocal('user-rol', response.data.rol);
                    saveToLocal('user-photo', user?.photoURL);
                    createPurchase();
                }
            });
    }


    const createPurchase = () => {
        axios.post(urls.createPurchase(uuidv4(), user?.uid))
            .then((response) => {
                if (response.status === 200) {
                    saveToLocal('purchase-id', response.data.purchaseId);
                    history.push('/shop');
                }
            });
    }

    if (user) {
        findUser();
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <button onClick={signInWithGoogle} className="button-login">
                    LogIn
                </button>
                <br />
                <p className="parraf-login">Si esta es la primer vez que ingresas a la Aplicación, recuerda elegir tu rol:</p>
                <select onChange={e => {
                    e.preventDefault();
                    setRol(e.target.value)
                }} className="select-login">
                    <option value="client">Cliente</option>
                    <option value="admin">Administrador</option>
                </select>
            </div>
        </div>
    );
}

export default LogIn;