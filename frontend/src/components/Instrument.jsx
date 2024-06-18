import { Link } from "react-router-dom"

export default function Instrument({ instrument }) {
  return (
    <div className="list-instrument">
      <h2 className="list-instrument-name">{instrument.name}</h2>
      <img className="list-instrument-image" src={instrument.imageurl} alt={instrument.name} />
      <Link to={`/instruments/${instrument.id}`} className="list-instrument-link">see more...</Link>
    </div>
  )
}