import React from "react";
import EditTaskForm from "./EditTaskForm";

export default function TaskMenuItem(props: any) {
  //set local state
  const [editMenuDisplayed, setEditMenuDisplayed] =
    React.useState<boolean>(false);

  let editIcon = "https://img.icons8.com/sf-black/64/FFFFFF/pencil.png";
  let closeIcon = "https://img.icons8.com/ios-filled/100/FFFFFF/multiply.png";

  //generate components in variables to make return logic more readable
  let taskInfo = (
    <div className="task-menu-item flexbox">
      <div className="task-info-container">
        <h3 className="task-info h3-date">{props.taskDate}</h3>
        <h3 className="task-info h3-title">{props.taskName}</h3>
        <h3 className="task-info h3-status">
          {props.taskStatus ? "Done" : "Not Finished"}
        </h3>
      </div>
      <div className="task-details-container">
        <p className="task-info">{props.taskDetails}</p>
      </div>
    </div>
  );

  let editTaskForm = (
    <EditTaskForm
      taskName={props.taskName}
      taskDate={props.taskDate}
      taskDetails={props.taskDetails}
      taskStatus={props.taskStatus}
      toggleEditMenu={toggleEditMenu}
    />
  );

  function toggleEditMenu() {
    setEditMenuDisplayed(!editMenuDisplayed);
  }

  return (
    <div className="task-item-container">
      <img
        title={editMenuDisplayed ? "Close Edit Form" : "Edit Task"}
        className="edit-icon"
        onClick={toggleEditMenu}
        src={editMenuDisplayed ? closeIcon : editIcon}
        alt="edit task"
        role="button"
        tabIndex={0}
        aria-label="Clickable image"
      />
      {editMenuDisplayed ? editTaskForm : taskInfo}
    </div>
  );
}
