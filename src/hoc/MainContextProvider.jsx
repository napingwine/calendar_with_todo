import React, { createContext, useState } from "react";
import moment from "moment/moment";

export const MainContext = createContext(null);

const Context = ({children}) => {
  const today = moment();
  const [curDisplayedDays, setCurDisplayedDays] = useState([]);
  const [selectedYearAndMonth, setSelectedYearAndMonth] = useState(today);
  const [formMode, setFormMode] = useState();
  const [formData, setFormData] = useState();

  const value = {
    today,
    curDisplayedDays,
    setCurDisplayedDays,
    selectedYearAndMonth,
    setSelectedYearAndMonth,
    formMode,
    setFormMode,
    formData,
    setFormData
  };
  
  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
};

export default Context;