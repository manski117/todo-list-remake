import React, {useContext} from "react";
import { AllContext } from "../App";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { taskFormSchema } from "../schemas";

//types
interface Values {
  title: string;
  date: string;
  details: string;
  complete: boolean;
}


export default function TaskForm(){
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
      setAllProjects(newAllProjects); 
      
  }



    return(
        <div className="task-form">
          <Formik
            initialValues={{
              title: '',
              date: '',
              details: '',
              complete: false,
            }}
            validationSchema={taskFormSchema}
            onSubmit={(values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
              setTimeout(() => {
                // alert(JSON.stringify(values, null, 2));
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
            </Form>
          </Formik>
         </div>
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







          let mockTask = {
      title:'go shopping',
      date:'10/29/2020',
      details:'long string here',
      complete: false
  }


*/