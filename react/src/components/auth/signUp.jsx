import React, { useState } from "react";
import { useRegisterUserMutation } from "../../api/authApi";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

import Error from "../error/error";
import SubmitButton from "../error/submit";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string, date, ref } from "yup";
import TextError from "../error/TextError";
import { setName } from "../../redux/sellerSlice";
import { useDispatch } from "react-redux";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const SignUp = ({ role }) => {
  const [userRegister, { isLoading, error, isError }] =
    useRegisterUserMutation();
    const dispatch=useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const validationSchema = object({
    name: string().required("Required"),
    email: string().email("Invalid email").required("Required"),

    password: string()
      .required("Required")
      .min(4, "Reqired minimum 4 characters"),
    password_confirmation: string()
      .required("Required")
      .oneOf([ref("password"), null], "password must match"),
  });
  const [message, setMessage] = useState("");
  console.log(message);
  const onSubmit = async (values, { resetForm, setFieldError }) => {
    await userRegister({
      ...values,
      is_active: true,
    })
      .unwrap()
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.id);
        localStorage.setItem("name", response.name);

        localStorage.setItem("logged", 1);
        localStorage.setItem("role", response.role);

        setMessage(response.message);
        dispatch(setName(response?.name))
        navigate(`/user/${response.name}`,  {replace:true})

      })
      .catch((error) => {
        console.log(error);
        error?.status === 422
          ? (setFieldError("email", error.data.errors.email),
            setFieldError("phone_number", error.data.errors.phone_number))
          : null;
      });
  };

  return (
    <section>
         <div className="p-4">
        <h2 className="text-green-600 font-semibold text-3xl">Technician</h2>
      </div>
    <section className="grid grid-cols-2 gap-4">
      <div className="grid place-content-center  text-4xl font-semibold">
        <h2 className="text-left space-y-2 text-gray-700">Welcome to User Registration Page</h2>
      </div>
      {isError && error?.status != 422 ? (
        <Error error={error} />
      ) : (
        <div className=" form  w-full  text-slate-800 p-8 ">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <div>
                    <label htmlFor="">
                      Full Name{" "}
                      <span className="  text-2xl text-red-600">*</span>
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Full Name"
                    />
                    <ErrorMessage name="name" component={TextError} />
                  </div>
                  <div>
                    <label htmlFor="">
                      Email Address{" "}
                      <span className="  text-2xl text-red-600">*</span>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      placeholder="user@gmail.com"
                    />
                    <ErrorMessage name="email" component={TextError} />
                  </div>

                  <div>
                    <label htmlFor="">
                      Password{" "}
                      <span className="  text-2xl text-red-600">*</span>
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password must be minimum 6 characters long"
                    />
                    <ErrorMessage name="password" component={TextError} />
                  </div>
                  <div>
                    <label htmlFor="">
                      Confirm Password{" "}
                      <span className="  text-2xl text-red-600">*</span>
                    </label>
                    <Field
                      type="password"
                      name="password_confirmation"
                      id=""
                      placeholder="Confirm your password"
                    />
                    <ErrorMessage
                      name="password_confirmation"
                      component={TextError}
                    />
                  </div>

                  <SubmitButton
                    isLoading={isLoading}
                    typeButton="Create Account"
                    password={true}
                    message={message}
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </section>
    </section>

  );
};

export default React.memo(SignUp);
