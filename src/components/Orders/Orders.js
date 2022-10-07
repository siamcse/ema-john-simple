import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import ReviewOrder from '../ReviewOrder/ReviewOrder';

const Orders = () => {
    const {initialCart} = useLoaderData();
    const [cart,setCart]= useState(initialCart);
    const handleCart = (id) =>{
        const newCart= cart.filter(product=> product.id !==id);
        setCart(newCart);
        removeFromDb(id);
    }
    const clearCart = () =>{
        setCart([]);
        deleteShoppingCart();
    }
    return (
        
        <div className="shop-container">
            <div className="orders-container">
                {
                    cart.map(product => <ReviewOrder
                        key={product.id}
                        product={product}
                        handleCart={handleCart}
                    ></ReviewOrder>)
                }
                {
                    cart.length ===0 && <h2>There is no item.Please select item. <Link to='/'>Shop More</Link></h2>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}
                clearCart={clearCart}>
                    <Link to='/'>Shop More</Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;