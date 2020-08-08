import * as yup from "yup";
import { regexEmail } from "../../library/regex";

export const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().matches(regexEmail, "Email must valid").required("Email is required"),
    message: yup.string().required("Message is required").min(10, "10 Characters minimum")
})