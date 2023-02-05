import React, {useContext} from "react";
import { AllContext } from "../App";

//types


export default function ProjectMenuItem(props: any) {
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;

    return(
        <div className="project-menu-item">
            <p>Im in a generated child component: {props.data}</p>
            <p>Im the same thing but a different prop name: {props.data2}</p>
        </div>
    );


}