import React, {useContext} from "react";
import { AllContext } from "../App";


export default function TaskForm(){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;


    return(
        <p>new task form component. 
            {/*  */}
            Wait for formik integration</p>
        
    )
}


//form stuff that was working just fine
/*
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
interface Values {
    firstName: string;
    lastName: string;
    email: string;
  }
    return (
        <div className="temporary-container">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
            }}
            validationSchema={projectNameSchema}
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
              <ErrorMessage name="firstName">{msg => <div className="error-feedback">{msg}</div>}</ErrorMessage>
                    
      
              <label htmlFor="lastName">Last Name</label>
              <Field id="lastName" name="lastName" placeholder="Doe" />
              <ErrorMessage name="lastName">{msg => <div className="error-feedback">{msg}</div>}</ErrorMessage>
      
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                placeholder="john@acme.com"
                type="email"
                
              />
              <ErrorMessage name="email">{msg => <div className="error-feedback">{msg}</div>}</ErrorMessage>
      
              <button type="submit">Submit</button>
            </Form>
          </Formik>
        </div>
      );

*/
