import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/Cart';
import Instrument from '../components/Instrument';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, getCartTotal, addToCart, subtractFromCart } = useContext(CartContext);
  const [total, setTotal] = useState(0)

  async function handleSubtractFromCart(item) {
    subtractFromCart(item)
  }
  async function handleAddToCart(item) {
    addToCart(item)
  }

  useEffect(() => {
    setTotal(getCartTotal())
  }, [cartItems])

  return (
    <div className='container cart'>
      {
        cartItems.map((item) => <div className='cart-instrument' key={item.id}>
          <Instrument instrument={item} />
          <div className='quantity-controls'>
            <button onClick={() => handleSubtractFromCart(item)}>-</button>
            <h3>{item.quantity}</h3>
            <button onClick={() => handleAddToCart(item)}>+</button>
          </div>
        </div>
        )}
      {
        !cartItems.length && <>
        <h1>Nothing here!</h1>
        <Link to="/instruments">View instrumnets</Link>
        </>
      }
      <h1 className='total'>Total: <span className='money'>
        ${total}</span></h1>
      <button>Checkout</button>
    </div>
  );

}

export default Cart;