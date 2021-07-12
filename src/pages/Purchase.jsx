import React, { useState, useEffect } from 'react';
import { urls } from '../environment/urls';
import { getFromLocal } from '../functions/localStorage';
import NavBar from '../components/NavBar';
import axios from '../environment/axiosConfig';
import PurchaseComponent from '../components/Purchase';

const Purchase = () => {

    const [purchase, setPurchase] = useState({});
    const purchaseId = getFromLocal('purchase-id');

    const getPurchase = () => {
        axios.get((urls.findPurchaseById(purchaseId)))
        .then((response)=>{
            setPurchase(response.data);
        })
    }
    useEffect(()=>{
        getPurchase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div>
            <NavBar />
            <PurchaseComponent purchase={purchase}/>
        </div>
    );
}

export default Purchase;