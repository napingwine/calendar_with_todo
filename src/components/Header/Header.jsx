import moment from "moment";
import React from "react";
import useCustomContext from "../../hooks/customContext";
import "./Header.css";

const Header = () => {
  const { setSelectedYearAndMonth, selectedYearAndMonth, setFormMode } = useCustomContext();

  const nextMonth = () => {
    setSelectedYearAndMonth(prev => {
      const newDate = prev.clone().add(1, "month");
      localStorage.setItem("selectedDate", JSON.stringify(newDate));
      return newDate;
    });
  };

  const prevMonth = () => {
    setSelectedYearAndMonth(prev => {
      const newDate = prev.clone().subtract(1, "month");
      localStorage.setItem("selectedDate", JSON.stringify(newDate));
      return newDate;
    });
  };

  const onDataPicker = (data) => {
    data = data.target.value.split("-");
    const newDate = moment({ "year": data[0], "month": data[1] - 1 });
    setSelectedYearAndMonth(newDate);
    localStorage.setItem("selectedDate", JSON.stringify(newDate));
  };

  const addNewTask = () => {
    setFormMode("add");
  };

  return (
    <header className="header">
      <button className="add-new-event-btn" onClick={addNewTask}>+</button>
      <div className="date-button-wrapper">
        <button onClick={prevMonth} className="month-selector-btn-prev" />
        <span>{selectedYearAndMonth.format("YYYY MMMM")}</span>
        <button onClick={nextMonth} className="month-selector-btn-next" />
        <input type="date" className="data-picker" onChange={onDataPicker}></input>
      </div>
    </header>
  );
};

export default Header;