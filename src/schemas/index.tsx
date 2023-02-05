import * as yup from "yup";
import parse from "date-fns/parse";

//setup regex variables


//schema is equal to an object that we setup with this chained shape method
export const projectNameSchema = yup.object().shape({
    //put the different values here you want to validate for
    projectName: yup
    .string()
    .min(2)
    .required("Required"),
    //TODO: write something later to make sure it cannot add a name if a project already exists
});

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
    
    
});