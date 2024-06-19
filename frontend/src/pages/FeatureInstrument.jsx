import { useContext, useEffect, useState } from "react";
import { getInstrumentById } from "../api";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/Cart"

export default function FeaturedInstrument() {
  const [instrument, setInstrument] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const { getCartTotal, addToCart } = useContext(CartContext);

  useEffect(() => {

    async function fetchInstrument() {
      const response = await getInstrumentById(id);
      setInstrument(response);
    };

    fetchInstrument();

  }, []);

  function handleAddToCart(item) {
    addToCart(item)
  }

  function getData() {
    let keys = Object.keys(instrument.data);
    return (
      <>
        {
          keys.map((key) => (
            <h3 className="instrument-data" key={key} > {key} - {Object.values(instrument.data)[keys.indexOf(key)]} </h3>
          ))
        }
        <h3>{instrument.stock} left in stock!</h3>
        <button onClick={() => handleAddToCart(instrument)} className="add-to-cart">Add to cart - ${parseFloat(instrument.price).toFixed(2)}</button>
        <h3 className="cart-total">Cart total - ${getCartTotal()}</h3>
      </>
    )
  }

  return (
    <div className="container">

      {
        instrument && (
          <div className="feature-info">
            <div className="main-info">
              <div className="title-card">
              <i onClick={(e) => navigate('/instruments')} className="fa-solid fa-arrow-left"></i>
              <h1>{instrument.name}</h1>
              </div>
              <img className="feature-image" src={instrument.imageurl} alt={instrument.name} />
            </div>
            <div className="other-info">
              {getData()}
            </div>
          </div>
        )
      }
    </div>
  )
}