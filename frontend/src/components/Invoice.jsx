import ItemInvoice from '../components/ItemInvoice'

export default function Invoice({ purchase }) {
  return (
    <div className='invoice'>
    <hr className='thick' />
    <h3>Invoice:</h3>
    {
      purchase.items.map((item) => <ItemInvoice item={item} key={item.id}/>)
    }
    <div className='row'>
      <p>Price:</p>
      <p><span className='money'>${parseFloat(purchase.total).toFixed(2)}</span></p>
    </div>
    <div className='row'>
      <p>Time of Purchase:</p>
      <p> {
        new Date(purchase.purchasedate).toLocaleString()
      }</p>
    </div>
    <div className='row'>
      <p>Confirmation Number:</p>
      <p>#{purchase.id}</p>
    </div>
    </div>
  )
}