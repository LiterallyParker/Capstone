import { createContext, useEffect, useState } from "react";
import { fetchInstruments } from "../api";
import Cart from "../pages/Cart";

export const InstrumentsContext = createContext([]);

export const InstrumentsProvider = ({ children }) => {
  const [instruments, setInstruments] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  async function getInstruments() {
    let instruments = await fetchInstruments();
    if (categoryFilter) {
      instruments = await instruments.filter((instrument) => instrument.category === categoryFilter)
    }
    if (nameFilter) {
      instruments = await instruments.filter((instrument) => instrument.name.toLowerCase().includes(nameFilter.toLocaleLowerCase()))
    }
    setInstruments(instruments)
  }

  useEffect(() => {
    getInstruments();
  }, [nameFilter, categoryFilter]);

  return (
    <InstrumentsContext.Provider
      value={{ instruments, getInstruments, setInstruments, nameFilter, setNameFilter, categoryFilter, setCategoryFilter }}>
        { children }
      </InstrumentsContext.Provider>
  )
}