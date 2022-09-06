import React from "react";
import CalendarDay from "../CalendarDay/CalendarDay";
import "./Calendar.css";

const Calendar = ({ curDisplayedDays, selectedMonth, setFormData, setFormMode }) => {
  return (
    <div className="calendar_grid">
      {curDisplayedDays.map((el, i) =>
        <CalendarDay
          key={el.curDay._d + i}
          dayData={el}
          selectedMonth={selectedMonth}
          setFormData={setFormData}
          setFormMode={setFormMode}
        />)}
    </div>
  );
};

export default Calendar;