import React from 'react';
import { formatDate } from '../functions/formatDate';
import { urls } from '../environment/urls';
import { useHistory } from 'react-router-dom';
import { signOutWithGoogle } from '../functions/authFunctions';
import Swal from 'sweetalert2';
import axios from '../environment/axiosConfig';
import Product from './Product';

const Purchase = ({ purchase }) => {
    const history = useHistory();

    const print = () => {
        window.print();
    }

    const paymentPurchase = () => {
        axios.delete(urls.paymentPurchase(purchase.purchaseId))
            .then((response) => {
                if (response.status === 200) {
                    Swal.fire({
                        title: "¡Compra realizada con éxito!",
                        confirmButtonText: '¡Entendido!',
                        confirmButtonColor: '#0eb11b',
                        icon: 'success'
                    }).then(result => {
                        if (result.isConfirmed) {
                            signOutWithGoogle();
                            history.push('/');
                        }
                    });
                }
            })
    }

    return (
        <>
            <div className="purchase-container">
                <div>
                    <p>Confirmación de pago: {purchase.purchaseId}</p>
                    <h1>$ {purchase.purchasePrice}</h1>
                    <h3>{formatDate(purchase.purchaseDate)}</h3>
                </div>
                <div>
                    <button className="navbar-logout-button" onClick={print}>
                        Imprimir
                    </button>
                    <button className="purchase-pay-button" onClick={paymentPurchase}>
                        Pagar
                    </button>
                </div>
            </div>
            <div className="shop-products-container">
                {purchase.product && purchase.product?.map((product) => (
                    <Product product={product} key={product.productId} />
                ))}
            </div>
        </>
    );
}

export default Purchase;