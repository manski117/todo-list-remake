import React, { useContext } from "react";
import { AllContext } from "../App";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
//schemas
import { conditionalEditProjectNameSchema } from "../schemas";
import * as yup from "yup";

//types
interface Values {
  projectName: string;
}

export default function EditProjectForm(props: any) {
  const { allProjects, selectedProject, currentTask } =
    React.useContext(AllContext);
  const [allProjectsCopy, setAllProjects] = allProjects;
  const [selectedProjectCopy, setSelectedProject] = selectedProject;

  function updateProjectNameInState(data: Values) {
    //changes only the project name in state.
    //keeps everything else, including tasks

    //create a copy of the state
    let newAllProjects = { ...allProjectsCopy };

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

  function promoteNewSelectedProject() {
    //if the user deletes an object while it is selected, a new proj must take its place

    if (!(allProjects === null)) {
      let newSelectedProject: string =
        allProjectsCopy[Object.keys(allProjectsCopy)[0]].title;
      setSelectedProject(newSelectedProject);
    } else {
      setSelectedProject(null);
    }
  }

  function deleteProject() {
    //create a copy of the state
    let newAllProjects = { ...allProjectsCopy };
    //delete old project in the object
    delete newAllProjects[`${props.oldProjectName}`];
    //set state equal to new object
    setAllProjects(newAllProjects);
    promoteNewSelectedProject();
  }

  class Project {
    title: string;
    tasks: {};

    constructor(title: string) {
      this.title = title;
      this.tasks = {};
    }
  }

  let editProjectSchema = conditionalEditProjectNameSchema(allProjectsCopy);

  return (
    <div className="edit-form-project-name">
      <button
        type="button"
        title="close edit form"
        onClick={props.handleClick}
        className="close-btn"
        aria-label="Close Form"
      >
        X
      </button>
      <Formik
        initialValues={{
          projectName: props.oldProjectName,
        }}
        validationSchema={editProjectSchema}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            //send sanitized, validated input to state
            updateProjectNameInState(values);
            setSubmitting(false);
          }, 500);
          resetForm();
          props.handleclick();
        }}
      >
        <Form className="Form formik-form">
          <label htmlFor="projectName">Edit Project Name</label>
          <span className="edit-input-container flexbox">
            <Field
              className="Field text-input"
              id="projectName"
              name="projectName"
              placeholder="Give your project a new name"
            />
            <button
              title="confirm changes"
              type="submit"
              className="small-submit-btn small-btn"
            >
              &#9989;
            </button>
            <button
              title="delete project"
              type="button"
              onClick={deleteProject}
              className="delete-btn small-btn small-delete-btn"
            >
              &#128465;
            </button>
          </span>
          <ErrorMessage name="projectName">
            {(msg) => (
              <div className="error-feedback error-msg-edit-project">{msg}</div>
            )}
          </ErrorMessage>
        </Form>
      </Formik>
    </div>
  );
}
