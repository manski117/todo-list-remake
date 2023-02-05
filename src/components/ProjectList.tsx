import React, {useContext} from "react";
import { AllContext } from "../App";
import ProjectMenuItem from "./ProjectMenuItem";

//types


export default function ProjectList(){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;

    const[displayProjects, setDisplayProjects] = React.useState<any>(null);
    let projects: any;



    //run this only when state updates
    React.useEffect(() => {
        console.log('Hello from the Project List component!', allProjectsCopy);
        if(allProjectsCopy !== null){
            console.log('allProjectsCopy updated and is NOT null.')
            projects = Object.keys(allProjectsCopy);
            let displayProjectsUpdate = projects.map((item: any)=>(
                <div key={item}>
                    <ProjectMenuItem data={item} data2={item} />
                </div>
                )
            );
            setDisplayProjects(displayProjectsUpdate);
        }
      }, [allProjectsCopy]);

    



    return(
        <div className="project-list flexbox">
            <p>project components go here</p>
            {(displayProjects !== null) ? displayProjects : null}
            <p>{currentTaskCopy}</p>
            <p>{selectedProjectCopy}</p>
        </div>
    )
}
/*
USEFUL TEST CODE

    let obj9 = {
        "feather": {
            "title": "feather",
            "tasks": {}
        },
        "queen": {
            "title": "queen",
            "tasks": {}
        }
    }

    // const projects = ['a', 'b', 'c'];
    

    // const projects = Object.keys(obj9);

// .map(el => <span className="project-span" key={Math.random().toString()}>{el}</span>)

*/