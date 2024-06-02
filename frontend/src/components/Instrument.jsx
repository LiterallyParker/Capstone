export default function Instrument({ instrument }) {
  return (
    <div className="list-instrument">
      <h2 className="list-instrument-name">{instrument.name}</h2>
      <h3 className="list-instrument-catagory">{instrument.catagory}</h3>
      <img className="list-instrument-image" src={instrument.imageurl} alt={instrument.name} />
      <p className="list-instrument-stock">{instrument.stock} left in stock</p>
    </div>
  )
}