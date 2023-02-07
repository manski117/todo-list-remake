import React, {useContext} from "react";
import { AllContext } from "../App";
import EditProjectForm from "./EditProjectForm";

//types


export default function ProjectMenuItem(props: any) {
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;
    const [editOpen, setEditOpen] = React.useState<boolean>(false);

    //variables and objects
    let projectToEdit = props.projectName;
    let editProjectComponent = <EditProjectForm projectName={projectToEdit} handleClick={toggleEditForm} />


    function handleEditClick(){
        alert(`you clicked the edit icon of ${props.projectName}`);
        toggleEditForm();
        //fucntion takes project name as a string
        //renders project form component with this string as its initial value. 
        // but doesn't crash if it's the SAME value.
    }

    function toggleEditForm(){
        setEditOpen(!editOpen);
    }

    function handleTitleClick(){
        alert(`you clicked the title text of ${props.projectName}`);
        updateSelectedProject();
    }

    function updateSelectedProject(){
        setSelectedProject(`${props.projectName}`);
    }


    return(
        <div className="project-item-container">
            <div className="project-menu-item flexbox">
              <img className="icon-img" src="https://img.icons8.com/material-two-tone/48/null/overview-pages-3.png" alt="icon" />
              <h3 className="project-item-heading" onClick={handleTitleClick}>{props.projectName}</h3>
              <img className="icon icon-btn" onClick={handleEditClick} src="https://img.icons8.com/ios/50/null/edit-property.png" alt="icon" role="button" tabIndex={0} aria-label="Clickable image"/>
            </div>
            {editOpen ? editProjectComponent : null}
        </div>
    );


}

