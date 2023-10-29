import { useNavigate, useParams } from "react-router";
import tyreImage from '../../assets/images/tyres.png';
import carHLImage from '../../assets/images/carHL.png';
import CheckoutForm from "./CheckoutForm";
import axios from "axios";
import AppConfig from "../../utils/AppConfig";

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { useEffect, useState } from "react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const PRODUCTS = [
  {
    id: 0,
    name: 'Tyres',
    price: 800,
    currencyUnit: '$',
    inStock: 200,
    imgSrc: tyreImage
  },
  {
    id: 1,
    name: 'Car Headlight',
    price: 300,
    currencyUnit: '$',
    inStock: 150,
    imgSrc: carHLImage
  }
]

export default function Checkout() {
  const { id: productId } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [productDetails, setProductDetails] = useState();

  const stripePromise = loadStripe('pk_test_51MHRgSEadUq75vpeStgJd9h5ucaetTwwFdhcIYHWWa7L6E6F5LZRd0mKbgdRRtZlI9skZLrmiputTDJGzZ94nxYi00LmjyIU2E');

  useEffect(() => {
    const product = PRODUCTS.find(e => e.id === +productId);
    setProductDetails(product);

    axios.post(AppConfig.apis.createPaymentIntent, {
      amount: product.price
    })
            .then(res => {
                if(res.status === 200) {
                    setClientSecret(res.data.clientSecret);
                }
            })
            .catch(err => {
                console.log("error", err);
            })
  }, [])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="row product-checkout d-flex justify-content-center align-item-center">
      <h3 style={{textAlign: 'center', marginBottom: '20px'}}>Payment for your order</h3>
      <div className="col-6">
        <div style={{textAlign: 'center'}}>
        <img src={productDetails?.imgSrc} width="200px" height="300px" alt={`${productDetails?.name} image`} style={{borderRadius: '10px'}} />
      <p className="product-name">{productDetails?.name}</p>
      <p className="product-price">{`${productDetails?.currencyUnit}${productDetails?.price}`}</p>
      <p>{`(${productDetails?.inStock} in stock)`}</p>
        </div>
        
      </div>
      <div className="col-4">
        {clientSecret && (
          <>
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
           </Elements>
          </>
        )}
        
        </div>
    </div>
  )
}