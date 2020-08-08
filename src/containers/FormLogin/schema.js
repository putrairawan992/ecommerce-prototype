import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup.string().email('invalid').required('required'),
  password: yup.string().required('required')
});
