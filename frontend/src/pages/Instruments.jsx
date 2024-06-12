import { useEffect, useState } from "react";
import { fetchInstruments } from "../api";
import Instrument from "../components/Instrument";

export default function Instruments() {
  const [instruments, setInstruments] = useState([]);
  const [filter, setFilter] = useState("");

  async function getInstruments() {
    const instruments = await fetchInstruments();
    return instruments
  }

  useEffect(() => {
    getInstruments().then(setInstruments)
  }, []);

  // useEffect(() => {
  //     const filteredInstruments = instruments.filter((instrument) => {return instrument.catagory === filter});
  //     setInstruments(filteredInstruments);
  //     console.log(instruments);
    
  // }, [filter]);

  async function handleChange(e) {
    setFilter(e.target.value);
    const filteredInstruments = await getInstruments().then((result) => {
      if (e.target.value) {
        result = result.filter((instrument) => instrument.catagory === e.target.value)
      }
      return result
  });
    setInstruments(await filteredInstruments)
  }

  return (
    <div className="instruments">
      <h1 className="title">Instruments</h1>
      <div className="filter">

        <div className="filter-div">
        <input className="filter-radio" type="radio" id="All" name="filter" value="" onChange={handleChange} checked = {filter === ""}/>
        <label htmlFor="All">All Instruments</label>
        </div>

        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Strings" name="filter" value="Strings" onChange={handleChange} checked = {filter === "Strings"}/>
        <label htmlFor="Strings">Strings</label>
        </div>
        
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Piano/Keys" name="filter" value="Piano/Keys" onChange={handleChange} checked = {filter === "Piano/Keys"}/>
        <label htmlFor="Piano/Keys">Piano/Keys</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Guitar/Bass" name="filter" value="Guitar/Bass" onChange={handleChange} checked = {filter === "Guitar/Bass"}/>
        <label htmlFor="Guitar/Bass">Guitar/Bass</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Drum Kits" name="filter" value="Drum Kits" onChange={handleChange} checked = {filter === "Drum Kits"}/>
        <label htmlFor="Drum Kits">Drum Kits</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Percussion" name="filter" value="Percussion" onChange={handleChange} checked = {filter === "Percussion"}/>
        <label htmlFor="Percussion">Percussion</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Modular/Synth" name="filter" value="Modular/Synth" onChange={handleChange} checked = {filter === "Modular/Synth"}/>
        <label htmlFor="Modular/Synth">Modular/Synth</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Woodwinds" name="filter" value="Woodwinds" onChange={handleChange} checked = {filter === "Woodwinds"}/>
        <label htmlFor="Woodwinds">Woodwinds</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Brass" name="filter" value="Brass" onChange={handleChange} checked = {filter === "Brass"}/>
        <label htmlFor="Brass">Brass</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Etc." name="filter" value="Etc." onChange={handleChange} checked = {filter === "Etc."}/>
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