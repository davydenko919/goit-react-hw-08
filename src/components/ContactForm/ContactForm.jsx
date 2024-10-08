// import css from './ContactForm.module.css';
import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";

const ContactForm = () => {
  const dispatch = useDispatch();

  const onAddContact = (values, actions) => {
    dispatch(addContact(values))
      .unwrap()
      .then(() => {
        toast.success("Contact was added successfully");
      });
    actions.resetForm();
  };

  const nameId = nanoid();
  const numberId = nanoid();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name is too short")
      .max(50, "Name is too long")
      .required("Name is required"),
    number: Yup.string()
      .required("Number is required")
      .min(3, "Number is too short")
      .max(50, "Number is too long"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      onSubmit={onAddContact}
      validationSchema={validationSchema}
    >
      <Form>
        <div>
          <label htmlFor={nameId}>Name</label>
          <Field type="text" name="name" id={nameId}></Field>
          <ErrorMessage name="name" component="span" />
        </div>
        <div>
          <label htmlFor={numberId}>Number</label>
          <Field type="text" name="number" id={numberId}></Field>
          <ErrorMessage name="number" component="span" />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
