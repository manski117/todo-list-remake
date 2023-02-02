import React, {useContext} from "react";
import { AllContext } from "../App";


export default function TaskForm(){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;


    return(
        <p>new task form component. Wait for formik integration</p>
    )
}