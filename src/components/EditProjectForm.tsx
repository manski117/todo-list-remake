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

    //local schema for conditional validation
    // function conditionalEditSchema(stateValue: any){
    //     //it cant just test itself, but every obj mike!!!!
    //     let keys = Object.keys(stateValue);
    //     if (!(stateValue === null)) {
    //         return yup.object({
    //           projectName: yup
    //           .string()
    //           .min(2).test('project-exists', 'Project already exists', value => !(keys.includes(value as string)))
    //           .required("Required"),
    //         })
    //     } else{
    //       return yup.object({
    //         projectName: yup
    //           .string()
    //           .min(2)
    //           .required("Required"),
    //       })
    //     }
      
        
    // }

    let editProjectSchema = conditionalEditProjectNameSchema(allProjectsCopy);


    return (
        <div className="edit-form-project-name">
          <button onClick={props.handleClick} aria-label="Close Form">X</button>
          <Formik
            initialValues={{
              projectName: ''
            }}
            validationSchema={editProjectSchema}
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
              <label htmlFor="projectName">Edit Project Name</label>
              <Field id="projectName" name="projectName" placeholder="Give your project a new name" />
              <ErrorMessage name="projectName">{msg => <div className="error-feedback">{msg}</div>}</ErrorMessage>
              
              <button type="submit">&#9989;</button>
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