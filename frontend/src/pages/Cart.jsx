import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/Cart';
import Instrument from '../components/Instrument';
import { Link } from 'react-router-dom';
import { addPurchase } from '../api/purchases';
import { AuthContext } from '../context/Auth';
import Invoice from '../components/Invoice';

function Cart() {
  const { token } = useContext(AuthContext)
  const { cartItems, getCartTotal, addToCart, subtractFromCart, clearCart } = useContext(CartContext);
  const [total, setTotal] = useState(0)
  const [purchase, setPurchase] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubtractFromCart(item) {
    subtractFromCart(item)
  }

  async function handleAddToCart(item) {
    addToCart(item)
  }

  async function handleCheckout() {
    setPurchase(null);
    const items = cartItems;
    const result = await addPurchase({ token, items });

    if (result.error) {
      setError(result.message);
      return
    }

    setPurchase(await result.purchase)
    clearCart();

  }

  function itemData(item) {
    console.log(item)
    return (
      <div className='cart-instrument' key={item.id}>
        <Instrument instrument={item} />
        <div className='quantity-controls'>
          <button onClick={() => handleSubtractFromCart(item)}>-</button>
          <h3>{item.quantity}</h3>
          <button onClick={() => handleAddToCart(item)}>+</button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    setTotal(getCartTotal())
  }, [cartItems])

  return (
    <div className='container cart margin-left'>
      {
        cartItems.map((item) => itemData(item)
        )}
      {
        !cartItems.length && <>
          <h2>Nothing in your cart!</h2>
          <Link to="/instruments">View instruments</Link>
        </>
      }
      {
        !purchase && <>
          <h1 className='total'>Total: <span className='money'>
            ${total}</span></h1>
          <button className='green-button' onClick={handleCheckout}>Checkout</button>
        </>
      }
      {
        error && <p className='error'>{error}</p>
      }
      {
        purchase && (
          <div>
            <h2>Purchase Confirmed!</h2>
            <Invoice purchase={purchase}/>
          </div>
        )
      }
    </div>
  );

}

export default Cart;