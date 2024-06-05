import { Link } from "react-router-dom"

export default function Instrument({ instrument }) {
  return (
    <div className="list-instrument">
      <h2 className="list-instrument-name">{instrument.name}</h2>
      <h3 className="list-instrument-catagory">{instrument.catagory}</h3>
      <img className="list-instrument-image" src={instrument.imageurl} alt={instrument.name} />
      <Link to={`/instruments/${instrument.id}`}>see more...</Link>
    </div>
  )
}