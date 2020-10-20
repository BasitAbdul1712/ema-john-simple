import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import HappyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
const Review = () => {

const [cart, setCart]  = useState([])
const [orderPlaced, setOrderPlaced] = useState(false)
const history = useHistory()
const handleProceedCheckOut = () => {
 history.push('/shipment')
}


const handleRemoveProducts = (productKey) => {
    // console.log('remove product', productKey);

    const newCart = cart.filter(pd => pd.key !== productKey);
    setCart(newCart)
    removeFromDatabaseCart(productKey);
}

useEffect(() => {
            //cart
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

            // const cartProducts = productKeys.map(key => {
            //     const product = fakeData.find(pd => pd.key === key);
            //     product.quantity = savedCart[key]; //quantity finding
            //         return product;
            // });
            // setCart(cartProducts)
       

        let thankyou;
        if (orderPlaced) {
           thankyou = <img src={HappyImage} alt="" />
        } 

    return (
        <div className = "twin-container">
           <div className = "product-container">
           {
                cart.map(pd => <ReviewItem
                    key={pd.key}
                    handleRemoveProducts = {handleRemoveProducts}
                    product={pd}></ReviewItem>)
            }
            {
                thankyou
            }
           </div>
           <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckOut} className="main-button">Proceed Check order</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;