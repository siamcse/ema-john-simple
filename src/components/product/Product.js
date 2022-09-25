import React from 'react';
import './Product.css';

const Product = (props) => {
    const {product, addToCart} = props;
    const {img, name, price, ratings, seller} = product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <p className='product-name'>{name}</p>
                <p className='product-price'>Price: ${price}</p>
                <p>Manufacturer: {seller}</p>
                <p>Rating: {ratings} stars</p>
            </div>
            <button onClick={()=>addToCart(product)} className='cart-button'>
                <p>Add to Cart</p>
            </button>
        </div>
    );
};

export default Product;