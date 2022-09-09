import moment from "moment";
import React from "react";
import "./CalendarDay.css";

const CalendarDay = ({ dayData, selectedMonth, setFormMode, setFormData }) => {

  const setStyle = () => {
    const month = dayData.curDay.format("MMM");
    if (month !== selectedMonth) {
      return "prev-and-next-month";
    } else if (moment().format("YYYY-MM-DD") === dayData.curDay.format("YYYY-MM-DD")) {
      return "current-day";
    }
  };

  const onEventClick = (el) => {
    setFormMode("edit");
    setFormData(el);
  };

  return (
    <div className={`calendar_grid__day ${setStyle()}`}>
      <div className="calendar__day__date">
        <span>{dayData.curDay.format("DD")}</span>
        <span>{dayData.curDay.format("dd")}</span>
      </div>
      <div className="calendar__day__event-wrapper">
        {dayData.tasks
          ? dayData.tasks.map(el =>
            <div
              className="calendar__day__event"
              key={el.id}
              onClick={() => onEventClick(el)}
            >
              {el.title}
            </div>)
          : ""
        }
      </div>
    </div>
  );
}

export default CalendarDay;
