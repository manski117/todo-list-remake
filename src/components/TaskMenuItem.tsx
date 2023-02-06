import React, {useContext} from "react";
import { AllContext } from "../App";

//types


export default function TaskMenuItem(props: any) {
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;

    // function handleEditClick(){
    //     alert(`you clicked the edit icon of ${props.projectName}`);
    // }

    

    function handleTitleClick(){
        alert(`you clicked the title text of ${props.taskName}`);
        
    }


    return(
        <div className="project-menu-item flexbox">
         <p className="task-info">{props.taskName}</p>
         <p className="task-info">{props.taskDate}</p>
         <p className="task-info">{props.taskDetails}</p>
         <p className="task-info">{props.taskStatus ? 'True' : 'False'}</p>

        </div>
    );


}