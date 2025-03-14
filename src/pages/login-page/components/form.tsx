"use client";

import { Formik, Form, Field, FormikProps } from "formik";
import axios from "axios";
import loginSchema from "./schema";
import ILogin from "./type";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/hooks";
import { onLogin } from "@/lib/redux/features/authSlice";
import sign from "jwt-encode"
import { setCookie } from "cookies-next";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initialValue: ILogin = {
    email: "",
    password: "",
  }

  const login = async(values: ILogin) => {
    try {
     const { data } = await axios.get(
      `http://localhost:7001/user?email=${values.email}&password=${values.password}`
    );
    console.log(data)

    if (data.length === 0) throw new Error("E-Mail atau Password salah");

    const stateUser = {
      user: {
        email: data[0].email,
        firstname: data[0].firstname,
        lastname: data[0].lastname,
    },
      isLogin: true
    };

    const token = sign(stateUser, "test")
  
    setCookie("access_token", token)
    dispatch(onLogin(stateUser))

      alert("Login Sukses")
      router.push("/")

    } catch (err) {
      alert((err as any).message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValue}
        validationSchema={loginSchema}
        onSubmit={(values, { resetForm }) => {
          login(values);
          resetForm();
        }}
      >
        {(props: FormikProps<ILogin>) => {
          const { values, handleChange, touched, errors } = props;

          return(
            <Form className="flex flex-col gap-4">
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
