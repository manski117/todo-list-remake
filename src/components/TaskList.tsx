import React, {useContext} from "react";
import { AllContext } from "../App";
import TaskMenuItem from "./TaskMenuItem";


export default function TaskList(){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;
    //local state
    const[displayTasks, setDisplayTasks] = React.useState<any>(null);
    let tasks: any;

    //mock data
    let mockTasks = {
        "feather1": {
            "title": "feather1",
            "date": "07-04-2032",
            "details": "this should be the first task inside of feather project",
            "complete": false
        },
        "feather2": {
            "title": "feather2",
            "date": "11-12-2002",
            "details": "this should be the second task inside of feather project",
            "complete": true
        }
    }

    let mockProject = {
        "title": "feather",
        "tasks": {
            "feather1": {
                "title": "feather1",
                "date": "07-04-2032",
                "details": "this should be the first task inside of feather project",
                "complete": false
            },
            "feather2": {
                "title": "feather2",
                "date": "11-12-2002",
                "details": "this should be the second task inside of feather project",
                "complete": true
            }
        }
    }
    

    let mockProjects = {
            "king": {
                "title": "king",
                "tasks": mockTasks
            },
            "feather": {
                "title": "feather",
                "tasks": mockTasks
            },
            "naniii": {
                "title": "naniii",
                "tasks": mockTasks
            }
    }

    function mockJSX(){
        tasks = Object.values(mockProjects[`king` as keyof typeof mockProjects].tasks);
            let displayTasksUpdate = tasks.map((item: any)=>(
                <div key={item.title}>
                    <TaskMenuItem
                        taskName={item.title}
                        taskDate={item.date}
                        taskDetails={item.details}
                        taskStatus={item.complete}
                    />
                </div>
                )
            );
            setDisplayTasks(displayTasksUpdate);
    }

    //functions to update components
    function isObjEmpty (obj: any) {
        console.log(obj);
        if (obj === undefined || obj === null){
            console.log('.tasks is undefined')
            return true;
        } else{
            console.log('.tasks has something in it!')
            return false;
        }
         
    }
    //generate components
    //run this only when state updates
    React.useEffect(() => {
        
        console.log('Hello from the Project List component!', allProjectsCopy);
        if(allProjectsCopy !== null){
            console.log('allProjectsCopy updated and is NOT null.');
            console.log(typeof (allProjectsCopy[`${selectedProjectCopy}`]?.tasks))
            let tasksEmpty = isObjEmpty((allProjectsCopy[`${selectedProjectCopy}`]?.tasks))
            if(!tasksEmpty){
                tasks = Object.values(allProjectsCopy[`${selectedProjectCopy}`].tasks);
                let displayTasksUpdate = tasks.map((item: any)=>(
                <div key={item.title}>
                    <TaskMenuItem
                        taskName={item.title}
                        taskDate={item.date}
                        taskDetails={item.details}
                        taskStatus={item.complete}
                    />
                </div>
                )
            );
            setDisplayTasks(displayTasksUpdate);

            } else {
                //TODO: decide what to run if there are no tasks to load
                console.log('tasks empty for existing project, so loading from mock');
                mockJSX();
            }
            
        } else {
            //what to run if there are no tasks to load
            console.log('initial render of TaskList.');
            mockJSX();

        }
      }, [allProjectsCopy, selectedProjectCopy]);




    

    return(
        <div className="project-tasks flexbox">
            <p>task components go here</p>
            {(displayTasks !== null) ? displayTasks : null}
        </div>
    )
}