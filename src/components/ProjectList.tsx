import React, {useContext} from "react";
import { AllContext } from "../App";

//types


export default function ProjectList(){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;

    
    
    // setCurrentTask(prev => prev + 1);
    
    function changeGlobalState(){
        // setCurrentTask(prev => prev + 1000);
        setAllProjects('back to C');
        // setSelectedProject(prev => prev + ' and more');
    }
    


    return(
        <div className="project-list flexbox">
            <p>project components go here</p>
            <p>{currentTaskCopy}</p>
            <p>{selectedProjectCopy}</p>
            <p>{allProjectsCopy}</p>
            <button onClick={changeGlobalState} >change state</button>
        </div>
    )
}