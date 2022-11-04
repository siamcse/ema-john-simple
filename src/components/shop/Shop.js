import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css';

const Shop = () => {
    // const { products, count } = useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const pages = Math.ceil(count / size);
    console.log(Array(pages).length)

    useEffect(() => {
        const url = `https://ema-john-simple-server-siamcse.vercel.app/products?page=${page}&size=${size}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setCount(data.count);
            })
    }, [page, size])

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const ids = Object.keys(storedCart);

        fetch("https://ema-john-simple-server-siamcse.vercel.app/productByIds", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                for (const id in storedCart) {
                    const addedProduct = data.find(product => id === product._id);
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
            })

        setCart(savedCart);
    }, []);

    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity += 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct._id);
    };
    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}>

                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to='/orders'>Review Order</Link>
                </Cart>
            </div>
            {/* paginations */}
            <div className='pagination'>
                <p>Currently selected page: {page + 1} & size: {size}</p>
                <button onClick={() => {
                    if (page > 0) {
                        setPage(page - 1)
                    }
                }}>
                    {"<"}
                </button>
                {
                    [...Array(pages).keys()].map(number =>
                        <>
                            <button
                                key={number}
                                onClick={() => setPage(number)}
                                className={page === number ? 'selected' : 'undefined'}
                            >
                                {number + 1}
                            </button>
                        </>
                    )
                }
                <button onClick={() => {
                    if (Array(pages).length - 1 > page) {
                        setPage(page + 1)
                    }
                }}>
                    {">"}
                </button>

                <select defaultValue={10} onChange={(event) => { setSize(event.target.value); setPage(0) }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;