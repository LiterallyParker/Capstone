export default function ItemInvoice({item}) {
  return (
    <div className='item'>
          <div className='row'>
            <h3>{item.name}</h3>
          </div>
          <hr className="no-margin"/>
          <div className='row'>
            <p>Item price:</p>
            <p><span className='money'>${parseFloat(item.price).toFixed(2)}</span></p>
          </div>
          <hr className='no-margin'/>
          <div className='row'>
            <p>Quantity:</p>
            <p>{item.quantity}</p>
          </div>
          <hr className='no-margin'/>
          <div className='row'>
            <p>Subtotal:</p>
            <p><span className='money'>${parseFloat(item.total).toFixed(2)}</span></p>
          </div>
          <hr />
        </div>
  )
}