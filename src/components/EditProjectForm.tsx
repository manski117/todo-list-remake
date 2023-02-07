import React, {useContext} from "react";
import { AllContext } from "../App";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { projectNameSchema } from "../schemas";

//types
interface Values {
    projectName: string;
  }


export default function EditProjectForm(props: any){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;
    const [isMounted, setIsMounted] = React.useState<boolean>(true);

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




    return (
        <div className="edit-form-project-name">
          <button onClick={props.handleClick} aria-label="Close Form">X</button>
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
        </div>
      );
}

/*TODO Tuesday:
    -finish writing component
    -make this component have a close button that unmounts itself
    -parent component will have the callback function
    -somehow make it populate its initial value from the project state
    -link it to the "editProjectForm" function in ProjectMenuItem
    -do something similar for tasks (make a task edit form)
    -fix the name collision problem (check and see if stack overflow answered hopefully)
    -rest should be easy, all css from there and hamburger menu item lol
    */