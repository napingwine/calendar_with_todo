import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import "./Form.css";
import uniqid from "uniqid";
import bin from "../../assets/bin.png";
import useCustomContext from "../../hooks/customContext";
import {updateTask, deleteTask, postTask} from "../../service/TODOSAPI.js"

const Form = () => {

  const today = moment();
  const { formMode, setFormMode, formData, setFormData } = useCustomContext();
  const [newUpdateDate, setNewUpdateDate] = useState();
  const [newUpdateTime, setNewUpdateTime] = useState();

  const hideForm = () => {
    setFormMode();
    setFormData();
  };

  const createNewEvent = (e) => {
    e.preventDefault();
    const form = document.forms[0];
    const newFormData = {};
    formMode === "edit" ? newFormData.id = formData.id : newFormData.id = uniqid();
    newFormData.title = form.title.value;
    if (form.description.value.trim()) newFormData.description = form.description.value;

    const taskDate = form.date.value;
    if (formMode === "edit") {
      newFormData.taskDate = formData.taskDate;
    } else {
      if (form.time.value) {
        newFormData.taskDate = [taskDate, form.time.value].join(" ");
      } else {
        newFormData.taskDate = taskDate;
      }
    };

    if (form.title.value && form.date.value) {
      if (formMode === "add") {
        newFormData.createdAt = today.format("YYYY-MM-DD HH:mm");
        postTask(newFormData);
      } else {
        newFormData.createdAt = formData.createdAt;
        newFormData.updatedAt = today.format("YYYY-MM-DD HH:mm");
        updateTask(newFormData);
      }
      setFormData();
      hideForm();
    };
  };

  const onDeleteEventBTN = (e) => {
    e.preventDefault();
    deleteTask(formData.id).then(res =>{ 
      if (res.status === 200) {
        
      } else {
        alert(res.status)
      }
    })
    hideForm();
  };

  useEffect(() => {
    if (formData?.createdAt) {
      const [date, time] = moment(formData.createdAt).format("DD.MM.YYYY HH:MM").split(" ");
      setNewUpdateDate(date);
      setNewUpdateTime(time);
    }
  }, []);

  return (
    <div className="form-wrapper" onClick={hideForm}>
      <div className="form-content" onClick={e => e.stopPropagation()}>
        <button onClick={hideForm} className="close-btn"><span /><span /></button>
        <h1>{formMode === "add" ? "Add new idea item" : "Edit idea item"}</h1>
        <div>{formMode === "edit" ? `Created at: ${formData.createdAt}` : ""}</div>
        <div>{formData?.updatedAt ? `Updated at: ${formData.updatedAt}` : ""}</div>
        <form>
          <label>
            <span>Title *</span>
            <input
              type="text"
              required name="title"
              placeholder="Title goes here"
              defaultValue={formData ? formData.title : ""}
            />
          </label>
          <label>
            <span>Description</span>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              defaultValue={formData ? formData.description : ""}
            />
          </label>
          <div className="date_setter_wrapper">
            <label>
              <span>Date</span>
              <input type="date" required name="date" defaultValue={today.format("YYYY-MM-DD")} />
            </label>
            <label>
              <span>Begin time</span>
              <input type="time" name="time" defaultValue={formData ? newUpdateTime : ""} />
            </label>
          </div>
          <div className="btn-wrapper">
            {formMode === "edit"
              ? <button onClick={onDeleteEventBTN} className="form__del-btn">
                <img src={bin} alt="del" />
              </button>
              : ""
            }
            <button onClick={createNewEvent} className="form__save-btn">save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;