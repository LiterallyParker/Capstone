import { useContext } from 'react';
import { CartContext } from '../context/Cart';

function Cart() {
  const { cartItems, getCartTotal } = useContext(CartContext);

  return (
    <div className='container'>
      {
        cartItems.map((item) => "hello")
      }
      Cart : { getCartTotal().toFixed(2) }
    </div>
  );

}

export default Cart;