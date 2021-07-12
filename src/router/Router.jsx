import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogIn from '../pages/LogIn';
import Profile from '../pages/Profile';
import Purchase from '../pages/Purchase';
import Shop from '../pages/Shop';
import ManageClients from '../pages/ManageClients';
import ManageProducts from '../pages/ManageProducts';


const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={LogIn}/>
                <Route path='/shop' component={Shop} />
                <Route path='/purchase' component={Purchase}/>
                <Route path='/profile' component={Profile}/>
                <Route path='/admin/products' component={ManageProducts}/>
                <Route path='/admin/clients' component={ManageClients}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;