import * as yup from "yup";
import parse from "date-fns/parse";
import { ProjectObject } from "../App";


export const projectNameSchema = yup.object().shape({
    projectName: yup
    .string()
    .min(2)
    .required("Required"),
});

export function conditionalEditProjectNameSchema(stateValue: any){
  
  if (!(stateValue === null)) {
      let keys = Object.keys(stateValue);
      return yup.object({
        projectName: yup
        .string()
        .min(2).test('project-exists', 'Project already exists', value => !(keys.includes(value as string)))
        .required("Required"),
      })
  } else{
    return yup.object({
      projectName: yup
        .string()
        .min(2)
        .required("Required"),
    })
  }
  
}

export function conditionalEditTaskSchema(stateValue: ProjectObject, selectedProject: string, taskToEdit: string){

  function getTaskTitles(projectObj: any | null, projectName: string) {
    if (projectObj === null) return [];
    let project = projectObj[projectName as keyof typeof projectObj];
    if (!project) return [];
    console.log('projectObj:', projectObj);
    console.log('project:', project);
    console.log('projectName:', taskToEdit);

    let { tasks } = project;
    return Object.values(tasks).map((task: any) => task.title);
  }


  //TODO: make it so you can still use THIS task name but not others
  if (!(stateValue === null)) {
      let allTasks = getTaskTitles(stateValue, selectedProject);
      console.log('allTasks:', allTasks);
      console.log('stateValue:', stateValue);
      console.log('taskToEdit:', taskToEdit);
      return yup.object({
        title: yup
        .string()
        .min(2).test('task-exists', 'Task already exists', value => !(allTasks.includes(value as string)))
        .required("Required"),
        date: yup.date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "mm-dd-yyyy", new Date());
      return result;
    })
    .typeError("please enter a valid date")
    .required("Required")
    .min("1969-11-13", "Date is too early"),
    details: yup.string(),
      })
  } else{
    return yup.object({
      title: yup
    .string()
    .min(3)
    .required("Required"),
    date: yup.date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "mm-dd-yyyy", new Date());
      return result;
    })
    .typeError("please enter a valid date")
    .required("Required")
    .min("1969-11-13", "Date is too early"),
    details: yup.string(),
    })
  }
  
}

export const taskFormSchema = yup.object().shape({
    //put the different values here you want to validate for
    
    title: yup
    .string()
    .min(3)
    .required("Required"),
    date: yup.date()
    .transform(function (value, originalValue) {
      if (this.isType(value)) {
        return value;
      }
      const result = parse(originalValue, "MM-dd-yyyy", new Date());
      return result;
    })
    .typeError("please enter a valid date")
    .required("Required")
    .min("1969-11-13", "Date is too early"),
    details: yup.string(),
    //TODO: write something later to make sure it cannot add a name if a project already exists
    
});

//.test('mike-test', 'Mike detected', value => !(value === 'mike'))
//.test('project-exists', 'Project already exists', value => !(keys.includes(value)))
//.test('project-exists', 'Project already exists', value => !(value === stateValue))

// function getTaskTitles(mockProjects:any , projectName:any) {
//   if (mockProjects === null) return [];
//   let project = mockProjects[projectName];
//   if (!project) return [];

//   let { tasks } = project;
//   return Object.values(tasks).map((task: any) => task.title);
// }