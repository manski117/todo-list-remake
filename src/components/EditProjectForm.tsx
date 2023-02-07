import React, {useContext} from "react";
import { AllContext } from "../App";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
//schemas
import { conditionalEditProjectNameSchema } from "../schemas";
import { projectNameSchema } from "../schemas";
import * as yup from "yup";

//types
interface Values {
    projectName: string;
  }


export default function EditProjectForm(props: any){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;
    

    function sendProjectNameToState(data: Values){
        let newAllProjects = {...allProjectsCopy};
        let newProject = new Project(`${data.projectName}`);
        newAllProjects[`${data.projectName}`] = newProject;
        console.log('newAllProjects,', newAllProjects);
        setAllProjects(newAllProjects);        
    }

    function updateProjectNameInState(data: Values){
      //changes only the project name in state.
      //keeps everything else, including tasks

      //create a copy of the state
      let newAllProjects = {...allProjectsCopy};

      //grab old project tasks using prop
      let oldProjectTasks = newAllProjects[`${props.oldProjectName}`].tasks;

      //delete old project in the object
      delete newAllProjects[`${props.oldProjectName}`];

      //add project with updated name back to new state object
      let updatedProject = new Project(`${data.projectName}`);
      updatedProject.tasks = oldProjectTasks;
      newAllProjects[`${data.projectName}`] = updatedProject;

      //set state equal to new object
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


    let editProjectSchema = conditionalEditProjectNameSchema(allProjectsCopy);


    return (
        <div className="edit-form-project-name">
          <button onClick={props.handleClick} className='close-btn' aria-label="Close Form">X</button>
          <Formik
            initialValues={{
              projectName: ''
            }}
            validationSchema={editProjectSchema}
            onSubmit={(values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
                // sendProjectNameToState(makeNewProject(values.projectName));
                // sendProjectNameToState(values);
                updateProjectNameInState(values);
                // makeNewProject(values.projectName);
                setSubmitting(false);
              }, 500);
              resetForm();
              //TODO: put function here that will unmount form
              
            }}
            
          >
            <Form className="Form formik-form">
              <label htmlFor="projectName">Edit Project Name</label>
              <Field className='Field text-input' id="projectName" name="projectName" placeholder="Give your project a new name" />
              <button type="submit">&#9989;</button>
              <ErrorMessage name="projectName">{msg => <div className="error-feedback error-msg">{msg}</div>}</ErrorMessage>
              
              
            </Form>
          </Formik>
        </div>
      );
}

/*TODO Tuesday:
    
    -somehow make it populate its initial value from the project state
    -link it to the "editProjectForm" function in ProjectMenuItem
    -do something similar for tasks (make a task edit form)
    -fix the name collision problem (check and see if stack overflow answered hopefully)
    -rest should be easy, all css from there and hamburger menu item lol
    */