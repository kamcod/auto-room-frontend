import PlanCard from './PlanCard';

const PLANS = [
  {
    id: 0,
    name: 'Basic',
    price: 30,
    currencyUnit: '$',
    description: 'you will received basic plan badge'
  },
  {
    id: 1,
    name: 'Premium',
    price: 50,
    currencyUnit: '$',
    description: 'you will received premium plan badge'
  }
];

export default function Upgrade() {
  return (
    <div className='product-page-wrapper'>
      <h4 style={{textAlign: 'center', marginBottom: '30px'}}>Upgrade Plan</h4>
      <div className='row d-flex justify-content-center'>
      {PLANS?.map(plan => {
        return <div className='col-3'>
          <PlanCard plan = {plan} />
        </div>
      })}
      </div>
      
    </div>
  )
}