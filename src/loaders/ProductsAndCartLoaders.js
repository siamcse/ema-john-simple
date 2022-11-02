import { getStoredCart } from "../utilities/fakedb";

export const ProductsAndCartLoaders = async () => {
    //get products
    const productsData = await fetch('http://localhost:5000/products');
    const products = await productsData.json();
    //get cart
    const savedCart = getStoredCart();
    const initialCart = [];
    for (const id in savedCart) {
        const addedProduct = products.find(product => id === product._id);
        if (addedProduct) {
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
    }

    return { products: products, initialCart: initialCart };
}