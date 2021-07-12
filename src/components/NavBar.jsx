import React, { useEffect, useState } from 'react';
import { signOutWithGoogle } from '../functions/authFunctions';
import { Link } from 'react-router-dom';
import { getFromLocal } from '../functions/localStorage';
import { urls } from '../environment/urls';
import Logo from '../images/logo.png'
import axios from '../environment/axiosConfig';

const NavBar = () => {
    const userRol = getFromLocal('user-rol');
    const userPhoto = getFromLocal('user-photo');
    const purchaseId = getFromLocal('purchase-id');
    const [contProducts, setContProducts] = useState(0);

    const getProducts = () => {
        axios.get(urls.showProducts(purchaseId))
            .then((response) => {
                setContProducts(response.data.length);
            })
    }

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="navbar-cointainer">
            <div className="navbar-brand">
                <Link to="/shop" className="navbar-logo">
                    <img src={Logo} alt="logo" />
                    <h2>La35Street</h2>
                </Link>
                <ul>
                    <li><Link to="/shop">Tienda</Link></li>
                    <li><Link to="/purchase">Comprar</Link></li>
                    {userRol === ('admin') ? (
                        <>
                            <li><Link to="/admin/products">Administrar Productos</Link></li>
                            <li><Link to="/admin/clients">Administrar Clientes</Link></li>
                        </>
                    ) : null}
                </ul>
            </div>
            <div className="navbar-profile">
                <Link className="navbar-car" to="/purchase">
                    <i className="fas fa-cart-plus"></i>
                    <span className="navbar-count-products">{contProducts}</span>
                </Link>
                <Link to="/profile"><img src={userPhoto} alt="Perfil" /></Link>
                <button onClick={signOutWithGoogle} className="navbar-logout-button">
                    <i className="fas fa-sign-out-alt"></i>
                </button>
            </div>
        </div>
    );
}
export default NavBar;