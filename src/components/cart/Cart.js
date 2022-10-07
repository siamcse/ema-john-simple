import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './Cart.css'

const Cart = ({cart, clearCart, children}) => {
    // console.log(cart);
    let total = 0;
    let shipping = 0;
    let quantity = 0;

    cart.forEach(product => {
        quantity += product.quantity;
        total += product.price * product.quantity;
        shipping += product.shipping;
    });
    
    
    const tax = parseFloat((total * 0.1).toFixed(2));

    const grandTotal = total + shipping + tax;

    return (
        <div className='cart'>
            <h1 className='cart-title'>Order Summary</h1>
            <div className='cart-info'>
                <p>Selected Items: {quantity}</p>
                <p>Total Price: ${total}</p>
                <p>Total Shipping Charge: ${shipping}</p>
                <p>Tax: ${tax}</p>
                <h3>Grand Total: ${grandTotal}</h3> 
            </div>
            <div className='order-button'>
                <button onClick={()=>clearCart()} className='clear-button'>
                    <p>Clear Cart</p>
                    <FontAwesomeIcon icon={faTrashCan}/>
                </button>
                <button className='review-button'>
                    <p>{children}</p>
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>
            </div>
            
        </div>
    );
};

export default Cart;