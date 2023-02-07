import React, {useContext} from "react";
import { AllContext } from "../App";

//types


export default function ProjectMenuItem(props: any) {
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;

    function handleEditClick(){
        alert(`you clicked the edit icon of ${props.projectName}`);
        //fucntion takes project name as a string
        //renders project form component with this string as its initial value. 
        // but doesn't crash if it's the SAME value.
    }

    function editProjectForm(projectName: string){
        //todo: finish this
    }

    function handleTitleClick(){
        alert(`you clicked the title text of ${props.projectName}`);
        updateSelectedProject();
    }

    function updateSelectedProject(){
        setSelectedProject(`${props.projectName}`);
    }


    return(
        <div className="project-menu-item flexbox">
          <img className="icon-img" src="https://img.icons8.com/material-two-tone/48/null/overview-pages-3.png" alt="icon" />
          <h3 className="project-item-heading" onClick={handleTitleClick}>{props.projectName}</h3>
          <img className="icon icon-btn" onClick={handleEditClick} src="https://img.icons8.com/ios/50/null/edit-property.png" alt="icon" role="button" tabIndex={0} aria-label="Clickable image"/>

        </div>
    );


}

