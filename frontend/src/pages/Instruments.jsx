import { useEffect, useState } from "react";
import { fetchInstruments } from "../api";
import Instrument from "../components/Instrument";

export default function Instruments() {
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {

    async function getInstruments() {
      const instruments = fetchInstruments()
      setInstruments(await instruments)
      console.log(instruments)
    }

    getInstruments()

  }, [])

  return (
    <div>
      <h1>Instruments</h1>
      <div>
        {
          instruments && instruments.map((instrument) => <Instrument key={instrument.id} instrument={instrument} />)
        }
      </div>
    </div>
  )
}