import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Shop from '../components/shop/Shop';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Shop></Shop>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;