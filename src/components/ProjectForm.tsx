import React, {useContext} from "react";
import { AllContext } from "../App";
import { Formik, Field, Form, FormikHelpers } from 'formik';

//types
interface Values {
    projectName: string;
  }




export default function ProjectForm(){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;




    return (
        <div className="temporary-container">
          <Formik
            initialValues={{
              projectName: ''
            }}
            onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
          >
            <Form>
              <label htmlFor="firstName">First Name</label>
              <Field id="firstName" name="firstName" placeholder="John" />
      
              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" placeholder="Doe" />
      
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="john@acme.com"
                type="email"
              />
      
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      );
}