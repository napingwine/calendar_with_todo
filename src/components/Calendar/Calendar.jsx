import React, { useEffect } from "react";
import useCustomContext from "../../hooks/customContext";
import CalendarDay from "../CalendarDay/CalendarDay";
import "./Calendar.css";
import { getTasksForThisMonth } from "../../service/TODOSAPI";

const Calendar = () => {
  const {
    selectedYearAndMonth,
    setCurDisplayedDays,
    curDisplayedDays,
    setFormData,
    setFormMode
  } = useCustomContext();

  const selectedMonth = selectedYearAndMonth.format("MMM");

  useEffect(() => {
    const [year, month] = selectedYearAndMonth.format("YYYY MM").split(" ");

    getTasksForThisMonth({ year, month }).then(res => {
      const startDay = selectedYearAndMonth.clone().set(selectedYearAndMonth._d).startOf("month").startOf("week");
      const endDay = selectedYearAndMonth.clone().set(selectedYearAndMonth._d).endOf("month").endOf("week");
      const curMonths = [];
      const day = startDay.clone();

      const taskByDate = res.reduce((acc, task) => {
        acc[task.taskDate] = acc[task.taskDate] || [];
        acc[task.taskDate].push(task);
        return acc;
      }, {});

      while (!day.isAfter(endDay)) {
        const newDay = { curDay: day.clone() };
        const curDay = day.format("YYYY-MM-DD");
        if (taskByDate[curDay]) newDay.tasks = taskByDate[curDay];
        curMonths.push(newDay);
        day.add(1, "day");
      };

      setCurDisplayedDays(curMonths);
    });
  }, [selectedYearAndMonth]);

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