import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";

const RegistrationForm = () => {
  const isError = useSelector(selectAuthError);
  const dispatch = useDispatch();

  const onRegister = (values, actions) => {
    dispatch(register(values))
      .unwrap()
      .then(() => {
        toast.success("Login was successful", {
          style: {
            border: "1px solid rgb(0, 106, 255)",
            padding: "16px",
            color: "rgb(0, 106, 255)",
          },
          iconTheme: {
            primary: "rgb(0, 226, 45)",
            secondary: "#FFFAEE",
          },
        });
      });
    actions.resetForm();
  };

  const nameId = nanoid();
  const emailId = nanoid();
  const passwordId = nanoid();

  const RegisterValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    email: Yup.string()
      .email("Email must be valid ")
      .required("Email is required")
      .min(3, "Too Short!")
      .max(50, "Too Long!"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password is too short")
      .max(50, "Password is too long"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={onRegister}
      validationSchema={RegisterValidationSchema}
    >
      <Form>
        <div>
          <label htmlFor={nameId}>Name</label>
          <Field type="text" name="name" id={nameId} />
          <ErrorMessage name="name" component="span" />
        </div>
        <div>
          <label htmlFor={emailId}>Email</label>
          <Field type="text" name="email" id={emailId} />
          <ErrorMessage name="email" component="span" />
        </div>
        <div>
          <label htmlFor={passwordId}>Password</label>
          <Field type="password" name="password" id={passwordId} />
          <ErrorMessage name="password" component="span" />
        </div>
        <button type="submit">Sign up</button>
        {isError && <p>The user with this email is already registred</p>}
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
