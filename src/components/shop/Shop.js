import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Order from '../order/Order';
import Product from '../product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(()=>{
        fetch('products.json')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[]);
    const addToCart = (product) =>{
        const newCart = [...cart,product];
        setCart(newCart);
    };
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product 
                        key={product.id} 
                        product={product}
                        addToCart={addToCart}>
                        
                        </Product>)
                }
            </div>
            <div className="cart-container">
                <Order cart={cart}></Order>
            </div>
        </div>
    );
};

export default Shop;