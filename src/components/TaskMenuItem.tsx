import React, {useContext} from "react";
import { AllContext } from "../App";
import EditTaskForm from "./EditTaskForm";

//types


export default function TaskMenuItem(props: any) {
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;
    const [editMenuDisplayed, setEditMenuDisplayed] = React.useState<boolean>(false);

    let taskInfo = (
        <div className="task-menu-item flexbox">
            <div className="task-info-container flexbox">
                <h3 className="task-info">{props.taskName}</h3>
                <h3 className="task-info">{props.taskDate}</h3>
                <h3 className="task-info">{props.taskStatus ? 'Done' : 'Not Finished'}</h3>
                
            </div>
            <div className="task-details-container">
                <p className="task-info">{props.taskDetails}</p>
            </div>
        </div>
    )

    let editTaskForm = <EditTaskForm taskName={props.taskName} />

    // function handleEditClick(){
    //     alert(`you clicked the edit icon of ${props.projectName}`);
    // }
    function toggleEditMenu(){
        setEditMenuDisplayed(!editMenuDisplayed);
    }    



    return(
        <div className="task-item-container">
            <img className="edit-icon" onClick={toggleEditMenu} src="https://img.icons8.com/ios-glyphs/60/null/menu-2.png" alt="edit task" role="button" tabIndex={0} aria-label="Clickable image"/>
            {editMenuDisplayed ? editTaskForm : taskInfo}
        </div>
    );


}