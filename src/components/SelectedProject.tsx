import React, { useContext } from "react";
import { AllContext } from "../App";

//components
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

export default function SelectedProject() {
  const { allProjects, selectedProject, currentTask } =
    React.useContext(AllContext);
  const [allProjectsCopy, setAllProjects] = allProjects;
  const [selectedProjectCopy, setSelectedProject] = selectedProject;
  const [taskFormDisplayed, setTaskFormDisplayed] =
    React.useState<boolean>(false);
  const [defaultMessage, setDefaultMessage] = React.useState<string>("");

  let formComponent = <TaskForm handleClick={toggleNewTaskForm} />;

  //run this only when state updates
  React.useEffect(() => {
    //on mount or updated project:
    updateDefaultMessage(allProjectsCopy, selectedProjectCopy);
  }, [selectedProjectCopy, allProjectsCopy]);

  function toggleNewTaskForm() {
    setTaskFormDisplayed(!taskFormDisplayed);
  }

  function updateDefaultMessage(projects: any, currentProject: any) {
    //displays message helpful to user depending on weather local storage loads
    if (projects === null) {
      setDefaultMessage(
        "You have no projects yet. \nCreate a project to begin!"
      );
    } else if (currentProject === null && !(projects === null)) {
      setDefaultMessage(
        "No project selected. Please choose a project from the project list."
      );
    }
  }

  return (
    <div id="current-project" className="flexbox">
      <div className="selected-project-header-container">
        <h2 className="selected-project-header">
          {selectedProjectCopy ? selectedProjectCopy : defaultMessage}
        </h2>
      </div>
      <div className="project-tasks-container flexbox">
        <TaskList />
      </div>
      <button
        onClick={toggleNewTaskForm}
        id="add-new-task"
        className="form-hide-button flexbox"
      >
        <img
          className="add-icon"
          src="https://img.icons8.com/ios-filled/100/FFFFFF/plus-2-math.png"
        />
        New Task
      </button>
      {taskFormDisplayed ? formComponent : null}
    </div>
  );
}
