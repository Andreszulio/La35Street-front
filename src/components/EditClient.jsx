import React, { useState, useEffect } from 'react';
import { urls } from '../environment/urls';
import { useForm } from 'react-hook-form';
import { auth } from '../functions/authFunctions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../environment/axiosConfig';


const EditClient = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [user] = useAuthState(auth);
    const [client, setClient] = useState({}); 
    const history = useHistory();

    const onSubmit = data => {
        axios.post(urls.createUser(user?.uid, data.name, data.address, data.email, data.telephone, data.rol))
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        title: "¡Usuario actualizado con éxito!",
                        confirmButtonText: '¡Entendido!',
                        confirmButtonColor: '#0eb11b',
                        icon: 'success'
                    }).then(result => {
                        if (result.isConfirmed) {
                            history.push('/admin/clients');
                        }
                    });
                }
            });
    }

    const findUserById = () => {
        axios.get(urls.findUserById(user?.uid))
            .then((response) => { setClient(response.data) });
    }

    useEffect(() => {
        findUserById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="create-product-container">
                {errors.name || errors.email || errors.rol || errors.telephone || errors.address ? (
                    <div className="create-product-errors">
                        Los datos ingresados son erróneos.
                    </div>
                ) : null}
                <div className="create-product-form-container">
                    <form onSubmit={handleSubmit(onSubmit)} className="create-product-form">
                        <div className="create-product-input">
                            <i className="fas fa-images"></i>
                            <input type="text" {...register('name', { required: true })} defaultValue={client.clientName}  placeholder="Nombre" />
                        </div>
                        <div className="create-product-input">
                            <i className="fas fa-signature"></i>
                            <input type="text" {...register('email', { required: true, maxLength: 40 })} defaultValue={client.clientEmail}  placeholder="Correo" />
                        </div>
                        <div className="create-product-input">
                            <i className="far fa-copyright"></i>
                            <input type="text" {...register('rol', { required: true, maxLength: 20 })} defaultValue={client.rol}  placeholder="Rol" />
                        </div>
                        <div className="create-product-input">
                            <i className="fas fa-dollar-sign"></i>
                            <input type="text" {...register('telephone', { required: true, maxLength: 20 })} defaultValue={client.clientTelephone==='null'?'':client.clientTelephone} placeholder="Teléfono" />
                        </div>
                        <div className="create-product-input">
                            <i className="fas fa-dollar-sign"></i>
                            <input type="text" {...register('address', { required: true, maxLength: 20 })} defaultValue={client.clientAddress==='null'?'':client.clientAddress} placeholder="Dirección" />
                        </div>
                        <input type="submit" value="Guardar" className="create-product-button" />
                    </form>
                    <div className="create-product-info">
                        En este apartado tendrás la accesibilidad de editar tu perfil, ya sea usuario u administrador
                        para lograr un mejor almacenamiento de la información en nuestra base de datos, así logrando una mayor
                        eficiencia para la búsqueda de la misma. Es importante mantener la información actualizada para que las personas
                        puedan contactarse con más facilidad por si tienen quejas, reclamos o peticiones. Adicionalmente como Administrador de 
                        la aplicación puedes ver a tus clientes, y es importante tener esta información en caso de presentar devoluciones.
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditClient;