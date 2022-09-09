import moment from "moment/moment";
import Header from "./components/Header/Header";
import Calendar from "./components/Calendar/Calendar";
import React, { useEffect } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import useCustomContext from './hooks/customContext.js';

function App() {
  moment.updateLocale("en", { week: { dow: 1 } });
  const { setSelectedYearAndMonth, formMode } = useCustomContext();

  useEffect(() => {
    const selectedDate = JSON.parse(localStorage.getItem("selectedDate"));
    if (selectedDate !== null) setSelectedYearAndMonth(moment(selectedDate));
  }, []);

  return (
    <div className="App container">
      <Header />
      <Calendar />
      {formMode ? <Form /> : ""}
    </div>
  );
};

export default App;
