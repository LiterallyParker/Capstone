import { useEffect, useState } from "react";
import { fetchInstruments } from "../api";
import Instrument from "../components/Instrument";

export default function Instruments() {
  const [instruments, setInstruments] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {

    async function getInstruments() {
      const instruments = await fetchInstruments();
      setInstruments(await instruments);
    }

    getInstruments();

    console.log(instruments)

  }, []);

  useEffect(() => {
    if (filter) {
      const filteredInstruments = instruments.filter((instrument) => instrument.catagory === filter);
      setInstruments(filteredInstruments);
      console.log(instruments);
    };
    
  }, [filter]);

  return (
    <div className="instruments">
      <h1>Instruments</h1>
      <div className="filter">
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="All" name="filter" value="" onChange={(e) => setFilter(e.target.value)} checked = {filter === ""}/>
        <label htmlFor="All">All Instruments</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Strings" name="filter" value="Strings" onChange={(e) => setFilter(e.target.value)} checked = {filter === "Strings"}/>
        <label htmlFor="Strings">Strings</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Piano/Keyboard" name="filter" value="Piano/Keyboard" onChange={(e) => setFilter(e.target.value)} checked = {filter === "Piano/Keyboard"}/>
        <label htmlFor="Piano/Keyboard">Piano/Keyboard</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Guitar/Bass" name="filter" value="Guitar/Bass" onChange={(e) => setFilter(e.target.value)} checked = {filter === "Guitar/Bass"}/>
        <label htmlFor="Guitar/Bass">Guitar/Bass</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Drum Kits" name="filter" value="Drum Kits" onChange={(e) => setFilter(e.target.value)} checked = {filter === "Drum Kits"}/>
        <label htmlFor="Drum Kits">Drum Kits</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Percussion" name="filter" value="Percussion" onChange={(e) => setFilter(e.target.value)} checked = {filter === "Percussion"}/>
        <label htmlFor="Percussion">Percussion</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Modular/Midi" name="filter" value="Modular/Midi" onChange={(e) => setFilter(e.target.value)} checked = {filter === "Modular/Midi"}/>
        <label htmlFor="Modular/Midi">Modular/Midi</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Woodwinds" name="filter" value="Woodwinds" onChange={(e) => setFilter(e.target.value)} checked = {filter === "Woodwinds"}/>
        <label htmlFor="Woodwinds">Woodwinds</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Brass" name="filter" value="Brass" onChange={(e) => setFilter(e.target.value)} checked = {filter === "Brass"}/>
        <label htmlFor="Brass">Brass</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Etc." name="filter" value="Etc." onChange={(e) => setFilter(e.target.value)} checked = {filter === "Etc."}/>
        <label htmlFor="Etc.">Etc.</label>
        </div>
      </div>
      <div>
        {
          instruments && instruments.map((instrument) => <Instrument key={instrument.id} instrument={instrument} />)
        }
      </div>
    </div>
  )
}