import React, {useContext} from "react";
import { AllContext } from "../App";


export default function TaskList(){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;


    return(
        <div className="project-tasks flexbox">
            <p>task components go here</p>
        </div>
    )
}