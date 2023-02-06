import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import axios from "axios";

const initalValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required("email is required"),
  password: Yup.string().required("password is necessary ....."),
});

const Login = () => {
  const { Auth } = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const loc = useLocation();
  const search = loc.search.slice(1);
  const navigate = useNavigate();

  const onSubmit = (values) => {
    axios
      .post("http://localhost:5000/api/auth", values)
      .then((res) => {
        // console.log(res.headers["x-auth-token"] )
        dispatch({ type: "AuthInitial", payload: res.data });
        // dispatch({ type: "Authtoken", payload: res.headers["x-auth-token"] });
        localStorage.setItem("AUTH", JSON.stringify(res.data));
        localStorage.setItem(
          "TOKEN",
          res.headers["x-auth-token"]
        );
      })
      .catch((err) => console.log(err));

    search ? navigate(`/${search}`) : navigate("/");
  };

  useEffect(() => {
    if (Auth) navigate(`/${search}`);
  }, [Auth]);

  const formik = useFormik({
    initialValues: initalValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <form className="flex flex-col items-center" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col px-4 my-2 w-full md:w-1/3">
        <label className="font-normal text-xs mb-1" htmlFor="email">
          email
        </label>
        <input
          className="border-2 rounded-md py-1 outline-none px-2"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
        />
      </div>
      <div className="flex justify-start w-full px-4 mb-2 md:w-1/3">
        {formik.errors.email && formik.touched.email && (
          <p className="text-sm text-red-400">{formik.errors.email}</p>
        )}
      </div>
      <div className="flex flex-col px-4 mb-2 w-full md:w-1/3">
        <label className="font-normal text-xs mb-1" htmlFor="password">
          password:
        </label>
        <input
          className="border-2 rounded-md py-1 outline-none px-2"
          id="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
        />
      </div>
      <div className="flex justify-start w-full px-4 mb-2 md:w-1/3">
        {formik.errors.password && formik.touched.password && (
          <p className="text-sm text-red-400 mt-1">{formik.errors.password}</p>
        )}
      </div>
      <button
        className="border px-2 mt-4 rounded-lg w-1/2 py-1 bg-green-200 md:w-1/4 cursor-pointer"
        type="submit"
        disabled={!formik.isValid}
      >
        Log in
      </button>
      <span className="font-normal text-xs mt-4 text-red-500">
        if not Register:
        <Link to={{ pathname: "/reg", search: search }}> Signup</Link>
      </span>
    </form>
  );
};

export default Login;
