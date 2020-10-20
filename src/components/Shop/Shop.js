import React, { useEffect } from 'react';
// import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css';
import { Link } from 'react-router-dom';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    // const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('')

useEffect(() => {
    fetch('http://localhost:5000/products?search='+search)
    .then(res => res.json())
    .then(data =>setProducts(data))
}, [search])
console.log(search);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/json' 
        },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])
    
    const handleSearch = event => {
        setSearch(event.target.value);
    }

    const handleAppProduct = (product) =>{
        const toBeAddededKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddededKey)
       let count = 1;
        let newCart;
        if (sameProduct) {
            count  = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddededKey)
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
        // const count = sameProduct.length
        // console.log('product added',product);
        // const newCart = [...cart, product] //new cart call kore age ja paichi ta add korlam
       
    }

//    console.log(fakeData); 
    return (

        <div className = "twin-container">
           
            {/* <h3>{products.length}</h3> */}
            <div className="product-container">
                <input type="text" onBlur ={handleSearch} placeholder="search"/>
                {
                  products.map(pd => 
                    <Product
                        key = {pd.key}
                        showAddToCart = {true}
                        handleAppProduct = {handleAppProduct}
                        Product ={pd} 
                    ></Product> )
                 }
            </div>
            <div className="cart-container">
               <Cart cart = {cart}>
                    <Link to="/review">
                        <button className="main-button"> Review order</button>
                    </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Shop;