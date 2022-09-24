import React from 'react';
import './Product.css';

const Product = (props) => {
    console.log(props.product);
    const {img, name, price, ratings, seller} = props.product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <p className='product-name'>{name}</p>
            <p className='product-price'>Price: ${price}</p>
            <p>Manufacturer: {seller}</p>
            <p>Rating: {ratings} star</p>
            <button className='product-button'>Add to Cart</button>
        </div>
    );
};

export default Product;