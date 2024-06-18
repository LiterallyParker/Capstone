import { useEffect, useState } from "react";
import { getInstrumentById } from "../api";
import { useParams } from "react-router-dom";

export default function FeaturedInstrument() {
  const [instrument, setInstrument] = useState(null);
  const { id } = useParams();

  useEffect(() => {

    async function fetchInstrument() {
      const response = await getInstrumentById(id);
      setInstrument(response);
    };

    fetchInstrument();

  }, []);

  function getData() {
    let keys = Object.keys(instrument.data);
    return (
      <>
        {
          keys.map((key) => (
              <h3 className="instrument-data" key={key} > {key} - {Object.values(instrument.data)[keys.indexOf(key)]} </h3>
          ))
        }
        <h3>In Stock - {instrument.stock}</h3>
        <h3>${instrument.price}</h3>
      </>
    )
  }

  return (
    <div className="feature">
      {
        instrument && (
          <div className="feature-info">
            <div className="main-info">
              <h1>{instrument.name}</h1>
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