import React from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10)
    const [cart, setCart] = useState([]);
    
    const handleAppProduct = (product) =>{
        console.log('product added',product);
        const newCart = [...cart, product] //new cart call kore age ja paichi ta add korlam
        setCart(newCart)
    }

//    console.log(fakeData); 
    return (

        <div className = "shop-container">
           
            {/* <h3>{products.length}</h3> */}
            <div className="product-container">
                {
                  products.map(pd => <Product
                     handleAppProduct = {handleAppProduct}
                     Product ={pd}
                     ></Product> )
                 }
            </div>
            <div className="cart-container">
              <Cart cart = {cart}></Cart>
            </div>
            
        </div>
    );
};

export default Shop;