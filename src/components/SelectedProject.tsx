import React, {useContext} from "react";
import { AllContext } from "../App";
    
//components
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

export default function SelectedProject(){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;


    return(
        <div id="current-project" className="flexbox">
            <div className="selected-project-header-container">
                <h2 className="selected-project-header">{selectedProjectCopy}</h2>
            </div>
            <div className="project-tasks flexbox">
                <TaskList />
            </div>
            <button id="add-new-task" className="form-hide-button">Add New Task</button>
            <TaskForm />
        </div>
    )
}