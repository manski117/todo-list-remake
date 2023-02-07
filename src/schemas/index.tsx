import * as yup from "yup";
import parse from "date-fns/parse";
// import React, {useContext} from "react";
// import { AllContext } from "../App";


//try useContext to read state declared in App.tsx
// const {allProjects, selectedProject, currentTask} = React.useContext(AllContext);
// const [allProjectsCopy, setAllProjects] = allProjects;
// let keys = Object.keys(allProjectsCopy);


export const projectNameSchema = yup.object().shape({
    projectName: yup
    .string()
    .min(2)
    .required("Required"),
});

export function conditionalEditProjectNameSchema(stateValue: any){
  //it cant just test itself, but every obj mike!!!!
  let keys = Object.keys(stateValue);
  if (!(stateValue === null)) {
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