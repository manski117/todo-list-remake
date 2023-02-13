import React, { useContext } from "react";
import { AllContext } from "../App";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import { conditionalEditProjectNameSchema } from "../schemas";
import * as yup from "yup";

//types
interface Values {
  projectName: string;
}

export default function ProjectForm(props: any) {
  const { allProjects } = React.useContext(AllContext);
  const [allProjectsCopy, setAllProjects] = allProjects;

  //this conditional schema allows names being typed to be compared to others in state
  let localProjectNameSchema =
    conditionalEditProjectNameSchema(allProjectsCopy);

  function sendProjectNameToState(data: Values) {
    let newAllProjects = { ...allProjectsCopy };
    let newProject = new Project(`${data.projectName}`);
    newAllProjects[`${data.projectName}`] = newProject;
    setAllProjects(newAllProjects);
  }

  class Project {
    title: string;
    tasks: {};

    constructor(title: string) {
      this.title = title;
      this.tasks = {};
    }
  }

  return (
    <div className="new-project-form">
      <Formik
        initialValues={{
          projectName: "",
        }}
        validationSchema={localProjectNameSchema}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            //send valid, sanitized user input to state
            sendProjectNameToState(values);
            setSubmitting(false);
          }, 500);
          resetForm();
          props.handleClose();
        }}
      >
        <Form className="new-project-form-Form">
          <label htmlFor="projectName">New Project Name</label>
          <br />
          <Field id="projectName" name="projectName" placeholder="My Project" />
          <ErrorMessage name="projectName">
            {(msg) => <div className="error-feedback">{msg}</div>}
          </ErrorMessage>

          <button
            title="Create Project"
            type="submit"
            className="small-submit-btn small-btn new-project-submit"
          >
            &#9989;
          </button>
        </Form>
      </Formik>
    </div>
  );
}