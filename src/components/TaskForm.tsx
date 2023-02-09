import React, {useContext} from "react";
import { AllContext } from "../App";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
//schemas
import { taskFormSchema } from "../schemas";
import { conditionalEditTaskSchema } from "../schemas";

//types
interface Values {
  title: string;
  date: string;
  details: string;
  complete: boolean;
}


export default function TaskForm(props: any){
    const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
    const [allProjectsCopy, setAllProjects] = allProjects;
    const [selectedProjectCopy, setSelectedProject] = selectedProject;
    const [currentTaskCopy, setCurrentTask] = currentTask;

    class Task {
      title: string;
      date: string;
      details: string;
      complete: boolean;

      constructor(title: string, date: string, details: string, complete: boolean=false){
          this.title=title;
          this.date=date;
          this.complete=complete;
          this.details=details;
      }
    }
  
    function sendTaskToProject(data: any, projectKey: string){

          //match up with name
      let newAllProjects = {...allProjectsCopy};
      let projectToUpdate = newAllProjects[`${projectKey}`];
      let tasksToUpdate = {...projectToUpdate.tasks};


      //make a task object
      let newTask = new Task(data.title, data.date, data.details, data.complete);

      //send it to nested project in state that matches the name
      tasksToUpdate[`${data.title}`] = newTask;
      newAllProjects[`${projectKey}`].tasks = tasksToUpdate;
      console.log('sendTaskToProject()',newTask, newAllProjects, tasksToUpdate);
      setAllProjects(newAllProjects); 
      
    }

    let newTaskFormSchema = conditionalEditTaskSchema(allProjectsCopy, selectedProjectCopy);



    return(
        <div className="task-form">
          <Formik
            initialValues={{
              title: '',
              date: '',
              details: '',
              complete: false,
            }}
            validationSchema={newTaskFormSchema}
            onSubmit={(values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                console.log(JSON.stringify(values, null, 2));
                // console.log(JSON.stringify(values, null, 2));
                sendTaskToProject(values, selectedProjectCopy);
                setSubmitting(false);
              }, 500);
            //   resetForm();
              //TODO: put function here that will unmount form
              
            }}
          >
            <Form>
              <label htmlFor="title">Task Name</label>
              <Field id="title" name="title" placeholder="My task" />
              <ErrorMessage name="title">{msg => <div className="error-feedback">{msg}</div>}</ErrorMessage>
              <br />
              
              <label htmlFor="date">Deadline</label>
              <Field id="date" name="date" placeholder="mm-dd-yyyy" />
              <ErrorMessage name="date">{msg => <div className="error-feedback">{msg}</div>}</ErrorMessage>
              <br />

              
              <label htmlFor="details">Details</label>
              <Field as='textarea' id="details" name="details" placeholder="Describe task here" />
              <ErrorMessage name="details">{msg => <div className="error-feedback">{msg}</div>}</ErrorMessage>
              <br />

              <label htmlFor="complete">Complete</label>
              <Field type='checkbox' id="complete" name="complete"/>
              <ErrorMessage name="complete">{msg => <div className="error-feedback">{msg}</div>}</ErrorMessage>
              <br />

              <button type="submit">Submit</button>
              <button onClick={props.handleClick} className="close-form">X</button>
            </Form>
          </Formik>
         </div>
    )
}

