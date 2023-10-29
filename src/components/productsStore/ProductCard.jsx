import { useNavigate } from "react-router";

export default function ProductCard({ product }) {
  const { id, name, price, currencyUnit, inStock, imgSrc } = product;
  const navigate = useNavigate();

  return (
    <div className="product-card" role="button" onClick={() => navigate(`/checkout/${id}`)}>
      <img src={imgSrc} width="200px" height="300px" alt={`${name} image`} />
      <p className="product-name">{name}</p>
      <p className="product-price">{`${currencyUnit}${price}`}</p>
      <p>{`(${inStock} in stock)`}</p>
    </div>
  )
}