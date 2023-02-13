import React, { useContext } from "react";
import { AllContext } from "../App";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
//schemas
import { conditionalEditTaskSchema } from "../schemas";

//types
interface Values {
  title: string;
  date: string;
  details: string;
  complete: boolean;
}

export default function TaskForm(props: any) {
  const { allProjects, selectedProject, currentTask } =
    React.useContext(AllContext);
  const [allProjectsCopy, setAllProjects] = allProjects;
  const [selectedProjectCopy, setSelectedProject] = selectedProject;

  //local variables and functions

  //this conditional schema allows new task related input to be checked against other names in state, avoiding collisions
  let newTaskFormSchema = conditionalEditTaskSchema(
    allProjectsCopy,
    selectedProjectCopy
  );

  class Task {
    title: string;
    date: string;
    details: string;
    complete: boolean;

    constructor(
      title: string,
      date: string,
      details: string = "",
      complete: boolean = false
    ) {
      this.title = title;
      this.date = date;
      this.complete = complete;
      this.details = details;
    }
  }

  function sendTaskToProject(data: any, projectKey: string) {
    //match up with name
    let newAllProjects = { ...allProjectsCopy };
    let projectToUpdate = newAllProjects[`${projectKey}`];
    let tasksToUpdate = { ...projectToUpdate.tasks };

    //make a task object
    let newTask = new Task(data.title, data.date, data.details, data.complete);

    //send it to nested project in state that matches the name
    tasksToUpdate[`${data.title}`] = newTask;
    newAllProjects[`${projectKey}`].tasks = tasksToUpdate;
    setAllProjects(newAllProjects);
  }

  return (
    <div className="new-task-form">
      <Formik
        initialValues={{
          title: "",
          date: "",
          details: "",
          complete: false,
        }}
        validationSchema={newTaskFormSchema}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            sendTaskToProject(values, selectedProjectCopy);
            setSubmitting(false);
          }, 500);
          resetForm();
          props.handleClick();
        }}
      >
        <Form className="new-task-form-Form">
          <div className="input-wrapper-new-task">
            <div className="task-info-input">
              <label htmlFor="title">Task Name*</label>
              <br />
              <Field id="title" name="title" placeholder="My task" />
              <ErrorMessage name="title">
                {(msg) => (
                  <div className="error-feedback new-task-error">{msg}</div>
                )}
              </ErrorMessage>
              <br />
            </div>

            <div className="task-info-input">
              <label htmlFor="date">Deadline*</label>
              <br />
              <Field id="date" name="date" placeholder="mm-dd-yyyy" />
              <ErrorMessage name="date">
                {(msg) => (
                  <div className="error-feedback new-task-error">{msg}</div>
                )}
              </ErrorMessage>
              <br />
            </div>
            <div className="task-info-input flexbox-checkbox">
              <label htmlFor="complete">Complete</label>
              <Field type="checkbox" id="complete" name="complete" />
              <ErrorMessage name="complete">
                {(msg) => (
                  <div className="error-feedback new-task-error">{msg}</div>
                )}
              </ErrorMessage>
              <br />
            </div>
          </div>

          <div className="task-info-textarea">
            <label htmlFor="details">Details</label>
            <br />
            <Field
              as="textarea"
              id="details"
              name="details"
              placeholder="Describe task here"
            />
            <ErrorMessage name="details">
              {(msg) => <div className="error-feedback">{msg}</div>}
            </ErrorMessage>
            <br />
          </div>

          <div className="button-wrapper-new-task">
            <button title="submit form" type="submit">
              Submit
            </button>
            <button
              title="close form"
              type="button"
              onClick={props.handleClick}
              className="close-form"
            >
              X
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
