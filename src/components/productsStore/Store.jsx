import tyreImage from '../../assets/images/tyres.png';
import carHLImage from '../../assets/images/carHL.png';
import ProductCard from './ProductCard';

export default function Store() {
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
  return (
    <div className='product-page-wrapper'>
      <h4 style={{textAlign: 'center', marginBottom: '20px'}}>Products</h4>
      <div className='row d-flex justify-content-center'>
      {PRODUCTS?.map(product => {
        return <div className='col-3'>
          <ProductCard product = {product} />
        </div>
      })}
      </div>
      
    </div>
  )
}