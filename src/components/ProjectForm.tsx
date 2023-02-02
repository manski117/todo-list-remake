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

    function sendProjetNameToState(data: Values){
        let newAllProjects = {...allProjectsCopy, data};
        setAllProjects(newAllProjects);        
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
                sendProjetNameToState(values);
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