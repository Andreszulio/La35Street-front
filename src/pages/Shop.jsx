import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Product from '../components/Product';
import axios from '../environment/axiosConfig';
import { urls } from '../environment/urls';

const Shop = () => {

    const [products, setProducts] = useState([]);

    const findProducts = () => {
        axios.get(urls.findProducts)
            .then((response) => { setProducts(response.data) });
    }
    useEffect(() => {
        findProducts();
    }, []);
    return (
        <div>
            <NavBar />
            <div className="shop-products-container">
                {products && products?.map((product) => (
                    <Product product={product} key={product.productId} />
                ))}
            </div>
        </div>
    );
}

export default Shop;