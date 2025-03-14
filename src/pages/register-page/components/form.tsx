"use client";

import { Formik, Form, Field, FormikProps } from "formik";
import axios from "axios";
import registerSchema from "./schema";
import IRegister from "./type";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const initialValue: IRegister = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  }

  const register = async(values: IRegister) => {
    try {
      await axios.post("http://localhost:7001/user", values);

      alert("Registrasi Sukses")
      router.push("/login")

    } catch (err) {
      alert((err as any).message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValue}
        validationSchema={registerSchema}
        onSubmit={(values, { resetForm }) => {
          register(values);
          resetForm();
        }}
      >
        {(props: FormikProps<IRegister>) => {
          const { values, handleChange, touched, errors } = props;

          return(
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col items-center">
                <label>First Name:</label>
                <Field
                  type="text"
                  name="firstname"
                  onChange={handleChange}
                  values={values.firstname}
                  className="border border-black rounded-[6px] p-1 w-[300px]"
                />
                {touched.firstname && errors.firstname && 
                  <div className="text-red-500">
                    {errors.firstname}
                  </div>}
              </div>
              <div className="flex flex-col items-center">
                <label>Last Name:</label>
                <Field
                  type="text"
                  name="lastname"
                  onChange={handleChange}
                  values={values.lastname}
                  className="border border-black rounded-[6px] p-1 w-[300px]"
                />
                {touched.lastname && errors.lastname && 
                  <div className="text-red-500">
                    {errors.lastname}
                  </div>}
              </div>
              <div className="flex flex-col items-center">
                <label>E-Mail:</label>
                <Field
                  type="text"
                  name="email"
                  onChange={handleChange}
                  values={values.email}
                  className="border border-black rounded-[6px] p-1 w-[300px]"
                />
                {touched.email && errors.email && 
                  <div className="text-red-500">
                    {errors.email}
                  </div>}
              </div>
              <div className="flex flex-col items-center">
                <label>Password:</label>
                <Field
                  type="password"
                  name="password"
                  onChange={handleChange}
                  values={values.password}
                  className="border border-black rounded-[6px] p-1 w-[300px]"
                />
                {touched.password && errors.password ? (
                  <div className="text-red-500">
                    {errors.password}
                  </div>) : null}
              </div>
              <button type="submit"> Submit</button>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}
