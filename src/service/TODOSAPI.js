const axios = {
  get: (url) => {
    const urlObj = new URL(url);
    const searchYear = urlObj.searchParams.get('year');
    const searchMonth = urlObj.searchParams.get('month');
    const events = JSON.parse(localStorage.getItem("allTasks")) || [];
    const response = events.filter(el => {
      const [taskYear, taskMonth] = el.taskDate.split('-');
      return taskYear === searchYear && taskMonth === searchMonth
    })
    return new Promise((res, rej) => res({ data: response }));
  },

  post: (url, body) => {
    const events = JSON.parse(localStorage.getItem("allTasks")) || [];
    events.push(body)
    localStorage.setItem("allTasks", JSON.stringify(events));
    return new Promise((res, rej) => res({ status: 200 }));
  },

  update: (url, body) => {
    const oldTasks = JSON.parse(localStorage.getItem("allTasks"));
    const newTasks = oldTasks.map(el => {
      if (el.id === body.id) {
        return body;
      }
      return el;
    });
    localStorage.setItem("allTasks", JSON.stringify(newTasks));
    return new Promise((res, rej) => res({ status: 200 }));
  },

  delete: (url) => {
    const urlObj = new URL(url);
    const taskID = urlObj.pathname.split('/').at(-1);
    const oldTasks = JSON.parse(localStorage.getItem("allTasks"));
    const newTasks = oldTasks.filter(el => el.id !== taskID)
    localStorage.setItem("allTasks", JSON.stringify(newTasks));
    return new Promise((res, rej) => res({ status: 200 }));
  }
};

const newURL = 'http://localhost:3000/task/';

export const getTasksForThisMonth = ({ year, month }) => {
  return axios.get(`${newURL}task?year=${year}&month=${month}`).then(res => res.data);
};

export const postTask = (task) => {
  return axios.post(newURL, task);
};

export const updateTask = (task) => {
  return axios.update(newURL, task);
};

export const deleteTask = (id) => {
  return axios.delete(`${newURL}${id}`);
};
