import React, {useContext} from "react";
import { AllContext } from "../App";

//components
import ProjectList from "./ProjectList";
import ProjectForm from "./ProjectForm";

export default function ProjectSidebar(){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;


    return(
        <aside id='projects-sidebar' className="flexbox">
            <h2 className="projects-menu-title">All Projects</h2>
            <div className="projects-menu flexbox">
                <ProjectList />
            </div>

            <button id="add-new-project" className="form-hide-button flexbox">New Project</button>
            <ProjectForm />

        </aside>
    )
}