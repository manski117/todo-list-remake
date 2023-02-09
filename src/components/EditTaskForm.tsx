import React, {useContext} from "react";
import { AllContext } from "../App";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { taskFormSchema } from "../schemas";
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


export default function EditTaskForm(props: any){
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

    function updateTaskInState(data: Values, projectName: string, taskToEdit: string){
        //changes only the task you are editing

        //create a copy of the state
        let newAllProjects = {...allProjectsCopy};


        //make a new task object
        let updatedTask = new Task(data.title, data.date, data.details, data.complete);

        //find the project that is being changed
        

        //delete the old task object
        delete newAllProjects[projectName].tasks[taskToEdit];

        //set the task of that object equal to the new task object
        newAllProjects[projectName].tasks[`${data.title}`] = updatedTask;

        //update state
        setAllProjects(newAllProjects); 
    }

    let taskFormEditSchema = conditionalEditTaskSchema(allProjectsCopy, selectedProjectCopy, props.taskName )

    return(
        <div className="task-form">
          <Formik
            initialValues={{
              title: '',
              date: '',
              details: '',
              complete: false,
            }}
            validationSchema={taskFormEditSchema}
            onSubmit={(values: Values, { setSubmitting, resetForm }: FormikHelpers<Values>) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                console.log(JSON.stringify(values, null, 2));
                // console.log(JSON.stringify(values, null, 2));
                // sendTaskToProject(values, selectedProjectCopy);
                updateTaskInState(values, selectedProjectCopy, props.taskName);
                setSubmitting(false);
              }, 500);
            //   resetForm();
              //TODO: put function here that will unmount form
              
            }}
          >
            <Form className="Form">
              <section className="task-info-container flexbox">
                  <div className="task-info-input">
                      <label htmlFor="title">Task</label>
                      <Field  className="Field task-input" id="title" name="title" placeholder="My task" />
                      <ErrorMessage name="title">{msg => <div className="error-msg error-feedback">{msg}</div>}</ErrorMessage>
                      <br />
                  </div>
                  
                  <div className="task-info-input">
                      <label htmlFor="date">Date</label>
                      <Field className="Field date-input" id="date" name="date" placeholder="mm-dd-yyyy" />
                      <ErrorMessage name="date">{msg => <div className="error-msg error-feedback">{msg}</div>}</ErrorMessage>
                      <br />
                  </div>
                  <div className="task-info-input">
                      <label htmlFor="complete">Complete</label>
                      <Field type='checkbox' id="complete" name="complete"/>
                      <ErrorMessage name="complete">{msg => <div className="error-msg error-feedback">{msg}</div>}</ErrorMessage>
                      <br />
                  </div>
              </section>

              <section className="task-details container">
                  <label htmlFor="details">Details</label>
                  <br />
                  <Field className="Field details-input" as='textarea' id="details" name="details" placeholder="Describe task here" />
                  <ErrorMessage name="details">{msg => <div className="error-msg error-feedback">{msg}</div>}</ErrorMessage>
                  <br />
              </section>

              <button className="form-edit-btn form-submit-btn" type="submit">Confirm Edits</button>
            </Form>
          </Formik>
         </div>
    )
}

/*
let mockProjects = {
    "king": {
        "title": "king",
        "tasks": {
"feather1": {
    "title": "feather1",
    "date": "07-04-2032",
    "details": "this should be the first task inside of feather project",
    "complete": false
},
"feather2": {
    "title": "feather2",
    "date": "11-12-2002",
    "details": "this should be the second task inside of feather project",
    "complete": true
}
}
    },
    "feather": {
        "title": "feather",
        "tasks": {
"feather1": {
    "title": "feather1",
    "date": "07-04-2032",
    "details": "this should be the first task inside of feather project",
    "complete": false
},
"feather2": {
    "title": "feather2",
    "date": "11-12-2002",
    "details": "this should be the second task inside of feather project",
    "complete": true
}
}
    },
    "naniii": {
        "title": "naniii",
        "tasks": {
"feather1": {
    "title": "feather1",
    "date": "07-04-2032",
    "details": "this should be the first task inside of feather project",
    "complete": false
},
"feather2": {
    "title": "feather2",
    "date": "11-12-2002",
    "details": "this should be the second task inside of feather project",
    "complete": true
}
}
    }
}
let purposelyNull = null;

function getTaskTitles(mockProjects, projectName) {
    if (mockProjects === null) return [];
    let project = mockProjects[projectName];
    if (!project) return [];

    let { tasks } = project;
    return Object.values(tasks).map(task => task.title);
}
let test1 = getTaskTitles(mockProjects, 'naniii');
let test2 = getTaskTitles(purposelyNull, 'naniii');
let test3 = getTaskTitles(mockProjects, 'bnds9ia');
console.log(test1, test2, test3);
*/