import React, { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPAyment from '../ProcessPAyment/ProcessPAyment';
import './Shipment.css';

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const [shippingData, setShippingData] = useState(null)
  
  const onSubmit = data => {
    setShippingData(data);
  };
  const handlePaymentSuccess = paymentId => {
    // console.log('form submitted',data)
    const savedCart = getDatabaseCart();
    const orderDetails = { 
      ...loggedInUser,
       products: savedCart, 
       paymentId,
       shipment: shippingData, 
       oderTime: new Date() };

    fetch('http://localhost:5000/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('Your order placed successfully')
        }
      })
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (

    <div className="row">
      <div style ={{ display: shippingData ? 'none' : 'block'}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

          <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your name" />
          {errors.exampleRequired && <span className="error" >Name is required</span>}
          <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
          {errors.email && <span cla ssName="error" >e-mail is required</span>}
          <input name="address" defaultValue={loggedInUser.address} ref={register({ required: true })} placeholder="Your Address" />
          {errors.address && <span className="error" >Address is required</span>}
          <input name="postcode" defaultValue={loggedInUser.postcode} ref={register({ required: true })} placeholder="Your Post code" />
          {errors.postcode && <span className="error" >Post code is required</span>}
          <input name="phone" defaultValue={loggedInUser.phone} ref={register({ required: true })} placeholder="Your Phone Number" />
          {errors.phone && <span className="error" >Phone number is required</span>}
          <input type="submit" />
        </form>
      </div>
      <div style ={{ display: shippingData ? 'block' : 'none'}} className="col-md-6">
        <h1>Please pray for me</h1>
        <ProcessPAyment handlePayment={handlePaymentSuccess}></ProcessPAyment>
      </div>
    </div>
  );
};

export default Shipment;