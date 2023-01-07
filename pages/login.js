import { useState } from "react";
import Head from "next/head";
import Layout from "../layout/layout";
import styles from "../styles/Form.module.css";
import { useFormik } from "formik";
import login_validate from "../helpers/validate";
import { useMutation } from "@tanstack/react-query"
import { userLogin } from "../api/users";
import Link from 'next/link'

import { AiFillEye, AiFillMail } from "react-icons/ai";
import { IoIosArrowRoundBack } from 'react-icons/io'

export default function Login() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState('')

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    const { email, password } = values;
    const payload = {
      email, password
    }
    loginInput(payload);
  }

  const { mutate: loginInput, isLoading, isError } = useMutation(
    (loginInput) => userLogin(loginInput),
    {
      onMutate() {
        console.log('Loading...')
      },
      onSuccess: (response) => {
        sessionStorage.setItem('token', response.token)

      },
      onError: (response) => {
        setError(response.response.data.error)
      }
    }
  )


  if (typeof window !== 'undefined' && sessionStorage.getItem('token')) {
    return window.location.href = "/"
  }


  const emailValidate = `${formik.errors.email && formik.touched.email
    ? "border-2 border-rose-600 focus:border-rose-600"
    : ""
    }`;
  const passwordValidate = `${formik.errors.password && formik.touched.password
    ? "border-2 border-rose-600 focus:border-rose-600"
    : ""
    }`;

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full py-6 px-8 md:px-10 m-auto bg-white rounded-xl shadow-md max-w-[90%] lg:max-w-[30%]">
          <div className="flex justify-center mt-5">
            <h1 className="text-3xl font-bold tracking-tight">Masuk</h1>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 my-8"
          >
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-500"
            >
              Email
            </label>
            <div className={`${styles.input_group} ${emailValidate} }`}>
              <input
                type="email"
                name="email"
                className={styles.input_text}
                {...formik.getFieldProps("email")}
              />
              <span className="flex items-center px-4 icon">
                <AiFillMail className="text-slate-400" size={15} />
              </span>
            </div>
            {emailValidate && (
              <span className="text-sm text-rose-500">
                {formik.errors.email}
              </span>
            )}
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-500"
            >
              Password
            </label>
            <div className={`${styles.input_group} ${passwordValidate}`}>
              <input
                type={`${show ? "text" : "password"}`}
                name="password"
                className={styles.input_text}
                {...formik.getFieldProps("password")}
              />
              <span
                className="flex items-center px-4 icon"
                onClick={() => setShow(!show)}
              >
                <AiFillEye className="text-slate-400" size={15} />
              </span>
            </div>
            {passwordValidate && (
              <span className="text-sm text-rose-500">
                {formik.errors.password}
              </span>
            )}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md bg-blue-500 hover:bg-blue-700 focus:outline-none "
              >
                {isLoading ? 'Loading...' : 'Masuk'}
              </button>
              <Link href={'/'}>
                <h4 className=" flex items-center gap-1 justify-center text-blue-500 text-sm mt-2">
                  <IoIosArrowRoundBack className="w-8 h-8" />
                  <span>Back to Home</span>
                </h4>
              </Link>
            </div>
            {isError ? <p className="text-sm text-rose-500 text-center my-4">{error}</p> : null}
          </form>
        </div>
      </div>
    </Layout>
  );
}


