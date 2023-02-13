import React, { useContext } from "react";
import { AllContext } from "../App";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
//schemas
import * as yup from "yup";
import { conditionalEditTaskSchema } from "../schemas";

//types
interface Values {
  title: string;
  date: string;
  details: string;
  complete: boolean;
}

export default function EditTaskForm(props: any) {
  const { allProjects, selectedProject } = React.useContext(AllContext);
  const [allProjectsCopy, setAllProjects] = allProjects;
  const [selectedProjectCopy, setSelectedProject] = selectedProject;

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

  function updateTaskInState(
    data: Values,
    projectName: string,
    taskToEdit: string
  ) {
    //changes only the task you are editing

    //create a copy of the state
    let newAllProjects = { ...allProjectsCopy };

    //make a new task object
    let updatedTask = new Task(
      data.title,
      data.date,
      data.details,
      data.complete
    );

    //find the project that is being changed

    //delete the old task object
    delete newAllProjects[projectName].tasks[taskToEdit];

    //set the task of that object equal to the new task object
    newAllProjects[projectName].tasks[`${data.title}`] = updatedTask;

    //update state
    setAllProjects(newAllProjects);
  }

  function deleteTask() {
    //create a copy of the state
    let newAllProjects = { ...allProjectsCopy };
    //delete the old task object
    delete newAllProjects[selectedProjectCopy].tasks[props.taskName];
    //update state
    setAllProjects(newAllProjects);
  }

  let taskFormEditSchema = conditionalEditTaskSchema(
    allProjectsCopy,
    selectedProjectCopy,
    props.taskName
  );

  return (
    <div className="task-form">
      <Formik
        initialValues={{
          title: props.taskName,
          date: props.taskDate,
          details: props.taskDetails,
          complete: props.taskStatus,
        }}
        validationSchema={taskFormEditSchema}
        onSubmit={(
          values: Values,
          { setSubmitting, resetForm }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            updateTaskInState(values, selectedProjectCopy, props.taskName);
            setSubmitting(false);
          }, 500);

          props.toggleEditMenu();
        }}
      >
        <Form className="Form">
          <section className="task-info-container flexbox">
            <div className="task-info-input">
              <label htmlFor="title">Task</label>
              <Field
                className="Field task-input"
                id="title"
                name="title"
                placeholder="My task"
              />
              <ErrorMessage name="title">
                {(msg) => <div className="error-msg error-feedback">{msg}</div>}
              </ErrorMessage>
              <br />
            </div>

            <div className="task-info-input">
              <label htmlFor="date">Date</label>
              <Field
                className="Field date-input"
                id="date"
                name="date"
                placeholder="mm-dd-yyyy"
              />
              <ErrorMessage name="date">
                {(msg) => <div className="error-msg error-feedback">{msg}</div>}
              </ErrorMessage>
              <br />
            </div>
            <div className="task-info-input">
              <label htmlFor="complete">Complete</label>
              <Field type="checkbox" id="complete" name="complete" />
              <ErrorMessage name="complete">
                {(msg) => <div className="error-msg error-feedback">{msg}</div>}
              </ErrorMessage>
              <br />
            </div>
          </section>

          <section className="task-details container">
            <label htmlFor="details">Details</label>
            <br />
            <Field
              className="Field details-input"
              as="textarea"
              id="details"
              name="details"
              placeholder="Describe task here"
            />
            <ErrorMessage name="details">
              {(msg) => <div className="error-msg error-feedback">{msg}</div>}
            </ErrorMessage>
            <br />
          </section>

          <div className="edit-button-wrapper flexbox">
            <button
              className="form-edit-btn form-submit-btn med-btn"
              type="submit"
            >
              Confirm Edits
            </button>
            <button
              onClick={deleteTask}
              type="button"
              className="med-btn form-edit-btn form-submit-btn"
            >
              Delete Task
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}