import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
// import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams()
    const [product, setProduct] = useState({})
    useEffect(() => {
        fetch('http://localhost:5000/product/' + productKey)
        .then(response => response.json())
        .then(data => setProduct(data))

    },[productKey])
    // const product = fakeData.find(pd => pd.key === productKey);
    // console.log(product);
    
    return (
        <div>
            <h1>Your Product Detail. </h1>
            <Product showAddToCart={false} Product={product}></Product>
        </div>
    );
};

export default ProductDetail;