import moment from "moment/moment";
import Header from "./components/Header/Header";
import Calendar from "./components/Calendar/Calendar";
import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import { postTask, getTasksForThisMonth, updateTask, deleteTask } from "./service/TODOSAPI.js";

function App() {
  moment.updateLocale("en", { week: { dow: 1 } });
  const today = moment();
  const [curDisplayedDays, setCurDisplayedDays] = useState([]);
  const [selectedYearAndMonth, setSelectedYearAndMonth] = useState(today);
  const [formMode, setFormMode] = useState();
  const [formData, setFormData] = useState();

  useEffect(() => {
    const selectedDate = JSON.parse(localStorage.getItem("selectedDate"));
    if (selectedDate !== null) setSelectedYearAndMonth(moment(selectedDate));
  }, []);

  useEffect(() => {
    const [year, month] = selectedYearAndMonth.format("YYYY MM").split(" ");
    getTasksForThisMonth({ year, month }).then(res => {
      const startDay = selectedYearAndMonth.clone().set(selectedYearAndMonth._d).startOf("month").startOf("week");
      const endDay = selectedYearAndMonth.clone().set(selectedYearAndMonth._d).endOf("month").endOf("week");
      const curMonths = [];
      let day = startDay.clone();
      while (!day.isAfter(endDay)) {
        const newDay = {
          curDay: day.clone()
        };
        const [iMonth, iDay] = day.format("MM DD").split(" ");
          if (res[iMonth]?.[iDay]) newDay.tasks = res[iMonth][iDay];
        curMonths.push(newDay);
        day.add(1, "day");
      };
      setCurDisplayedDays(curMonths);
    });
  }, [selectedYearAndMonth, formMode]);

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

  const postNewEvent = (task) => {
    postTask(task);
  };

  const updateEvent = (data) => {
    updateTask(data);
  };

  const deleteEvent = (data) => {
    deleteTask(data);
  };

  return (
    <div className="App container">
      <Header
        setFormMode={setFormMode}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
        selectedYearAndMonth={selectedYearAndMonth}
        setSelectedYearAndMonth={setSelectedYearAndMonth}
      />
      {curDisplayedDays.length !== 0 ?
        <Calendar
          curDisplayedDays={curDisplayedDays}
          selectedMonth={selectedYearAndMonth.format("MMM")}
          setFormMode={setFormMode}
          setFormData={setFormData}
        />
        : ""
      }
      {formMode ?
        <Form
          setFormMode={setFormMode}
          formData={formData}
          setFormData={setFormData}
          formMode={formMode}
          postNewEvent={postNewEvent}
          updateEvent={updateEvent}
          deleteEvent={deleteEvent}
        />
        : ""
      }
    </div>
  );
};

export default App;
