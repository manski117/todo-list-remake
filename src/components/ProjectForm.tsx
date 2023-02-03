import React, {useContext} from "react";
import { AllContext } from "../App";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { projectNameSchema } from "../schemas";

//types
interface Values {
    projectName: string;
  }


export default function ProjectForm(){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;

    function sendProjectNameToState(data: Values){
        let newAllProjects = {...allProjectsCopy};
        let newProject = new Project(`${data.projectName}`)
        newAllProjects[`${data.projectName}`] = newProject;
        console.log('newAllProjects,', newAllProjects);
        setAllProjects(newAllProjects);        
    }

    class Project {
        title: string;
        tasks: {};

        constructor(title: string){
            this.title = title;
            this.tasks = {};
        }
    }

    class Task {
        title: string;
        date: string;
        details: string;
        complete: boolean;

        constructor(title: string, date: string, details: string, complete: boolean=false){
            this.title=title;
            this.date=date;
            this.complete=complete;
            this.details=details;
        }
    }
    
    let mockTask = {
        title:'go shopping',
        date:'10/29/2020',
        details:'long string here',
        complete: false
    }

    function sendTaskToProject(data: any, projectKey: string){

            //match up with name
        let newAllProjects = {...allProjectsCopy};
        let projectToUpdate = newAllProjects[`${projectKey}`];
        let tasksToUpdate = {...projectToUpdate.tasks};

        

        //make a task object
        let newTask = new Task(data.title, data.date, data.details, data.complete);

        //send it to nested project in state that matches the name
        tasksToUpdate[`${data.title}`] = newTask;
        newAllProjects[`${projectKey}`].tasks = tasksToUpdate;
        setAllProjects(newAllProjects); 
        
    }

    function handleClick(){
        sendTaskToProject(mockTask, 'pikachu');
    }




    return (
        <div className="temporary-container">
          <Formik
            initialValues={{
              projectName: ''
            }}
            validationSchema={projectNameSchema}
            onSubmit={(values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
                // sendProjectNameToState(makeNewProject(values.projectName));
                sendProjectNameToState(values);
                // makeNewProject(values.projectName);
                setSubmitting(false);
              }, 500);
              resetForm();
              //TODO: put function here that will unmount form
              
            }}
          >
            <Form>
              <label htmlFor="projectName">Project Name</label>
              <Field id="projectName" name="projectName" placeholder="My Project" />
              <ErrorMessage name="projectName">{msg => <div className="error-feedback">{msg}</div>}</ErrorMessage>
              
              <button type="submit">Submit</button>
            </Form>
          </Formik>
          <button onClick={handleClick} >click here to add a test task</button>
        </div>
      );
}