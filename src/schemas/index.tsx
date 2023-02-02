import * as yup from "yup";

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

export const firstNameSchema = yup.object().shape({
    //put the different values here you want to validate for
    email: yup.string().email('i can say what I want here...').required("Required"),
    firstName: yup
    .string()
    .min(3)
    .required("Required"),
    lastName: yup
    .string()
    .min(1)
    .required("Required"),
    
    
});