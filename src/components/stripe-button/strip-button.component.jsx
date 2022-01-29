import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishablekey = 'get a key ... put it here';

const onToken = token => {
    console.log(token);
    alert('Payment Successful');
    }
    return (
        <StripeCheckout 
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://thumbs.dreamstime.com/z/simple-sophisticated-crown-vector-logo-design-jewelry-fabrication-clothing-brand-template-160935151.jpg'
            description={`Your total is $ ${price}`}
            amount = {priceForStripe}
            panelLabel='Pay Now'
            token = {onToken}
            stripeKey = {publishablekey}
        />
    )
}
export default StripCheckoutButton;