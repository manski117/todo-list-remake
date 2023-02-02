import React from "react";
//components
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

export default function SelectedProject(){


    return(
        <div id="current-project" className="flexbox">
            <div className="selected-project-header-container">
                <h2 className="selected-project-header">Select a project</h2>
            </div>
            <div className="project-tasks flexbox">
                <TaskList />
            </div>
            <button id="add-new-task" className="form-hide-button">Add New Task</button>
            <TaskForm />
        </div>
    )
}