import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
import SplitCard from './SplitCard';

const stripePromise = loadStripe('pk_test_51He3yVJRVruVD2GbfrPdgZ00MldRfw77aN7OV9UIcbbYUCR650XqNRKAmkZWaLP5bHYydO8jYGFENCtp3ZK7AguM00rLY9OPbD');

const ProcessPAyment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
              <SimpleCardForm handlePayment={handlePayment} ></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPAyment;