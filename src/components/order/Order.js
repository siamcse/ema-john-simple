import React from 'react';
import './Order.css'

const Order = ({cart}) => {
    let totalPrice = 0;
    cart.forEach(product => {
        totalPrice += product.price;
    });
    
    let shippingCharge;
    if(totalPrice>1000){
        shippingCharge = 10;
    }
    else if(totalPrice>500){
        shippingCharge = 5;
    }
    else{
        shippingCharge = 0;
    }
    const tax = totalPrice * 15 / 100;

    const grandTotal = totalPrice + shippingCharge + tax;

    return (
        <div>
            <h1 className='cart-title'>Order Summary</h1>
            <div className='cart-info'>
                <p>Selected Items: {cart.length}</p>
                <p>Total Price: ${totalPrice}</p>
                <p>Total Shipping Charge: ${shippingCharge}</p>
                <p>Tax: ${tax}</p>
                <h3>Grand Total: ${grandTotal}</h3>
            </div>
        </div>
    );
};

export default Order;