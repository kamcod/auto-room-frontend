import { useState } from "react";
import { useNavigate } from "react-router";

export default function PlanCard({ plan }) {
  const { id, name, price, currencyUnit, description } = plan;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="product-card" role="button" onClick={() => navigate(`/checkout/${id}`)}>
      <p className="product-name" style={{fontSize: '22px'}}>{name}</p>
      <p className="product-price">{`${currencyUnit}${price}`}</p>
      <p>{description}</p>
      <div className="d-flex justify-content-center" style={{margin: '5px 0px 15px 0'}}>
      <button className="add-new-car-btn d-flex justify-content-center" style={{width: '90%', alignItems: 'center'}} disabled={isLoading} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Buy"}
        </span>
      </button>
      </div>
      
    </div>
  )
}