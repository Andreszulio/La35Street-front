import React from 'react';
import { getFromLocal } from '../functions/localStorage';
import { urls } from '../environment/urls';
import Swal from 'sweetalert2';
import axios from '../environment/axiosConfig';

const Product = ({ product }) => {

    const userRol = getFromLocal('user-rol');
    const purchaseId = getFromLocal('purchase-id');
    const url = window.location.href.split('/');

    const addProductToPurchase = () => {
        axios.post(urls.createProducts(product.productId, product.brand, product.productPrice, product.productName, purchaseId),{ 'image': product.image })
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        title: "¡Producto añadido a la cesta!",
                        confirmButtonText: '¡Entendido!',
                        confirmButtonColor: '#0eb11b',
                        icon: 'success'
                    }).then(result => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                }
            })
    }

    return (
        <div className="product-container">
            <img src={product.image} alt="img-product" />
            <div className="product-info">
                <h3>{product.productName}</h3>
                <p>{product.brand}</p>
                <strong>{product.productPrice}</strong>
                {userRol === ('client') && url[3]!=='purchase' ? (
                    <div>
                        <button className="product-container-button-function-add" onClick={addProductToPurchase}>
                            Añadir a la cesta
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Product;