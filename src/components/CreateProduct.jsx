import React, { useState, useEffect } from 'react';
import { urls } from '../environment/urls';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import axios from '../environment/axiosConfig';
import Product from './Product';


const CreateProduct = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [products, setProducts] = useState([]);

    const onSubmit = data => {
        axios.post(urls.createProducts(uuidv4(), data.brand, data.price, data.name, 1), { 'image': data.image })
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        title: "¡Producto agregado con éxito!",
                        confirmButtonText: '¡Entendido!',
                        confirmButtonColor: '#0eb11b',
                        icon: 'success'
                    }).then(result => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                }
            });
    }

    const findProducts = () => {
        axios.get(urls.findProducts)
            .then((response) => { setProducts(response.data) });
    }

    useEffect(() => {
        findProducts();
    }, []);

    return (
        <>
            <div className="create-product-container">
                {errors.brand || errors.image || errors.name || errors.price ? (
                    <div className="create-product-errors">
                        Los datos ingresados son erróneos.
                    </div>
                ) : null}
                <div className="create-product-form-container">
                    <form onSubmit={handleSubmit(onSubmit)} className="create-product-form">
                        <div className="create-product-input">
                            <i className="fas fa-images"></i>
                            <input type="text" {...register('image', { required: true })} placeholder="Imagen" />
                        </div>
                        <div className="create-product-input">
                            <i className="fas fa-signature"></i>
                            <input type="text" {...register('name', { required: true, maxLength: 20 })} placeholder="Nombre" />
                        </div>
                        <div className="create-product-input">
                            <i className="far fa-copyright"></i>
                            <input type="text" {...register('brand', { required: true, maxLength: 20 })} placeholder="Marca" />
                        </div>
                        <div className="create-product-input">
                            <i className="fas fa-dollar-sign"></i>
                            <input type="text" {...register('price', { required: true, maxLength: 20 })} placeholder="Precio" />
                        </div>
                        <input type="submit" value="Guardar" className="create-product-button" />
                    </form>
                    <div className="create-product-info">
                        En este apartado (como administrador) podrás crear y enviar nuevos productos a la sección "TIENDA", para que así el cliente
                        tenga la posibilidad de visualizar su contenido, tales como una foto del producto, el tipo de producto, la marca y su precio. Bien sabemos
                        que para aumentar la confianza del posible comprador, cuando se decide a incorporar un artículo en la tienda virtual, es necesario hacerlo de forma amigable y explícita.
                        Es decir, se le debe dar una descripción detallada de cada producto.
                    </div>
                </div>
            </div>
            <div className="shop-products-container">
                {products && products?.map((product) => (
                    <Product product={product} key={product.productId} />
                ))}
            </div>
        </>
    );
}

export default CreateProduct;