import {useStripe, useElements, PaymentElement, LinkAuthenticationElement, CardElement} from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm () {

  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState();
  const [email, setEmail] = useState();

  const paymentElementOptions = {
    layout: "tabs"
  }
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirmation",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
    setIsLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      {/* <CardElement />      */}
      {/* card element is for single line card element (no further ui and no need of setting client secret) */}
      <button className='payment-now-btn' disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
    </form>
    </div>
  )
}