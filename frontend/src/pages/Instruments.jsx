import { useEffect, useState, useContext } from "react";
import { fetchInstruments } from "../api";
import Instrument from "../components/Instrument";
import { InstrumentsContext } from "../context/Instruments";

export default function Instruments() {
  const { instruments, getInstruments, nameFilter, setNameFilter, categoryFilter, setCategoryFilter } = useContext(InstrumentsContext)

  async function handleChange(e) {
    setCategoryFilter(e.target.value)
  }

  return (
    <div className="container instruments">

      <h1 className="title">Instruments</h1>
      <div className="filter">

        <div className="filter-div">
        <input className="filter-radio" type="radio" id="All" name="filter" value="" onChange={(e) => handleChange(e)} checked = {categoryFilter === ""}/>
        <label htmlFor="All">All Instruments</label>
        </div>

        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Strings" name="filter" value="Strings" onChange={(e) => handleChange(e)} checked = {categoryFilter === "Strings"}/>
        <label htmlFor="Strings">Strings</label>
        </div>
        
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Piano/Keys" name="filter" value="Piano/Keys" onChange={(e) => handleChange(e)} checked = {categoryFilter === "Piano/Keys"}/>
        <label htmlFor="Piano/Keys">Piano/Keys</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Guitar/Bass" name="filter" value="Guitar/Bass" onChange={(e) => handleChange(e)} checked = {categoryFilter === "Guitar/Bass"}/>
        <label htmlFor="Guitar/Bass">Guitar/Bass</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Drum Kits" name="filter" value="Drum Kits" onChange={(e) => handleChange(e)} checked = {categoryFilter === "Drum Kits"}/>
        <label htmlFor="Drum Kits">Drum Kits</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Percussion" name="filter" value="Percussion" onChange={(e) => handleChange(e)} checked = {categoryFilter === "Percussion"}/>
        <label htmlFor="Percussion">Percussion</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Modular" name="filter" value="Modular" onChange={(e) => handleChange(e)} checked = {categoryFilter === "Modular"}/>
        <label htmlFor="Modular">Modular</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Woodwinds" name="filter" value="Woodwinds" onChange={(e) => handleChange(e)} checked = {categoryFilter === "Woodwinds"}/>
        <label htmlFor="Woodwinds">Woodwinds</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Brass" name="filter" value="Brass" onChange={(e) => handleChange(e)} checked = {categoryFilter === "Brass"}/>
        <label htmlFor="Brass">Brass</label>
        </div>
        <div className="filter-div">
        <input className="filter-radio" type="radio" id="Etc." name="filter" value="Etc." onChange={(e) => handleChange(e)} checked = {categoryFilter === "Etc."}/>
        <label htmlFor="Etc.">Etc.</label>
        </div>
      </div>
      <div>
      <i className="fa-solid fa-search"></i>
      <input type="text" className="search-bar" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)}/>
      </div>
      <div>
        {
          !instruments.length && <>Nothing to see...</>
        }
        {
          instruments && instruments.map((instrument) => <Instrument key={instrument.id} instrument={instrument} />)
        }
      </div>
    </div>
  )
}