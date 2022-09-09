export const getTasksForThisMonth = ({ year, month }) => {
  const events = JSON.parse(localStorage.getItem("allTasks")) || {};
  let response = {};
  if (events[year]) response = events[year][month];

  return new Promise((res, rej) => res({ [month]: response }));
};

export const postTask = (task) => {
  const events = JSON.parse(localStorage.getItem("allTasks")) || {};
  const [year, month, day] = task.taskDate.split(" ")[0].split("-");
  if (!events[year]) events[year] = {};
  if (!events[year][month]) events[year][month] = {};
  if (!events[year][month][day]) {
    events[year][month][day] = [task];
  } else {
    events[year][month][day].push(task);
  }
  localStorage.setItem("allTasks", JSON.stringify(events));

  return new Promise((res, rej) => res({ status: 200 }));
};

export const updateTask = (task) => {
  const events = JSON.parse(localStorage.getItem("allTasks"));
  const [year, month, day] = task.taskDate.split(" ")[0].split("-");
  let eventsOfDay = events[year][month][day];
  events[year][month][day] = eventsOfDay.map(el => {
    if (el.id === task.id) {
      return task;
    }
    return el;
  });
  localStorage.setItem("allTasks", JSON.stringify(events));

  return new Promise((res, rej) => res({ status: 200 }));
};

export const deleteTask = (task) => {
  const events = JSON.parse(localStorage.getItem("allTasks"));
  const [year, month, day] = task.taskDate.split(" ")[0].split("-");
  const eventsOfDay = events[year][month][day];
  events[year][month][day] = eventsOfDay.filter(el => el.id !== task.id);
  localStorage.setItem("allTasks", JSON.stringify(events));

  return new Promise((res, rej) => res({ status: 200 }));
};