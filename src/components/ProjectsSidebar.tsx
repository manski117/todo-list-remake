import React, {useContext} from "react";
import { AllContext } from "../App";

//components
import ProjectList from "./ProjectList";
import ProjectForm from "./ProjectForm";

export default function ProjectSidebar(){
    const {allProjects, selectedProject, currentTask, sidebarOpen} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;
    const [sidebarOpenCopy, setSidebarOpen] = sidebarOpen;
    //local state and vars
    const [newFormOpen, setNewFormOpen] = React.useState<boolean>(false);
    
    //local functions
    function toggleNewForm(){
        setNewFormOpen(!newFormOpen);
    }

    let sidebarClassToggle = sidebarOpenCopy ? 'flexbox' : 'flexbox hidden'


    return(
        <aside id='projects-sidebar' className={sidebarClassToggle}>
            <h2 className="projects-menu-title">All Projects</h2>
            <div className="projects-menu flexbox">
                <ProjectList />
            </div>

            <button onClick={toggleNewForm} id="add-new-project" className="form-hide-button flexbox">New Project</button>
            {newFormOpen ? <ProjectForm /> : null}

        </aside>
    )
}