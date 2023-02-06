import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux";
import axios from "axios";

const initalValues = {
  Username: "",
  Email: "",
  // PhoneNumber: "",
  Password: "",
  ConfirmPassword: "",
};

const validationSchema = yup.object({
  Username: yup.string().required("...."),
  Email: yup.string().required("...."),
  // PhoneNumber: yup.string().required("...."),
  Password: yup.string().required("Password is required"),
  ConfirmPassword: yup
    .string()
    .oneOf([yup.ref("Password"), null], "Passwords must match"),
});

const Register = () => {
  const Auth = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const loc = useLocation();
  const search = loc.search.slice(1);
  const navigate = useNavigate();

  const onSubmit = (values) => {
    let newvalues = {
      name: values.Username,
      email: values.Email,
      password: values.Password,
    };
    axios
      .post("http://localhost:5000/api/users", newvalues)
      .then((res) => {
        dispatch({ type: "AuthInitial", payload: res.data });
        // dispatch({ type: "Authtoken", payload: res.headers["x-auth-token"] });
        localStorage.setItem("AUTH", JSON.stringify(res.data));
        localStorage.setItem(
          "TOKEN",
          JSON.stringify(res.headers["x-auth-token"])
        );
      })
      .catch((err) => console.log(err));

    search ? navigate(`/${search}`) : navigate("/");
  };

  const formik = useFormik({
    initialValues: initalValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <form className="flex flex-col items-center" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col px-4 my-2 w-full md:w-1/3">
        <label className="font-normal text-xs mb-1" htmlFor="Username">
          Username:
        </label>
        <input
          className="border-2 rounded-md py-1 outline-none px-2"
          id="Username"
          name="Username"
          value={formik.values.Username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
        />
      </div>
      <div className="flex justify-start w-full px-4 mb-2 md:w-1/3">
        {formik.errors.Username && formik.touched.Username && (
          <p className="text-sm text-red-400 mt-1">{formik.errors.Username}</p>
        )}
      </div>
      <div className="flex flex-col px-4 mb-2 w-full md:w-1/3">
        <label className="font-normal text-xs mb-1" htmlFor="Email">
          Email
        </label>
        <input
          className="border-2 rounded-md py-1 outline-none px-2"
          id="Email"
          name="Email"
          value={formik.values.Email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
        />
      </div>
      <div className="flex justify-start w-full px-4 mb-2 md:w-1/3">
        {formik.errors.Email && formik.touched.Email && (
          <p className="text-sm text-red-400 mt-1">{formik.errors.Email}</p>
        )}
      </div>
      {/* <div className="flex flex-col px-4 mb-2 w-full md:w-1/3">
        <label className="font-normal text-xs mb-1" htmlFor="PhoneNumber">
          PhoneNumber:
        </label>
        <input
          className="border-2 rounded-md py-1 outline-none px-2"
          id="PhoneNumber"
          name="PhoneNumber"
          value={formik.values.PhoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
        />
      </div> */}
      {/* <div className="flex justify-start w-full px-4 mb-2 md:w-1/3">
        {formik.errors.PhoneNumber && formik.touched.PhoneNumber && (
          <p className="text-sm text-red-400 mt-1">
            {formik.errors.PhoneNumber}
          </p>
        )}
      </div> */}
      <div className="flex flex-col px-4 mb-2 w-full md:w-1/3">
        <label className="font-normal text-xs mb-1" htmlFor="Password">
          Password:
        </label>
        <input
          className="border-2 rounded-md py-1 outline-none px-2"
          id="Password"
          value={formik.values.Password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
        />
      </div>
      <div className="flex justify-start w-full px-4 mb-2 md:w-1/3">
        {formik.errors.Password && formik.touched.Password && (
          <p className="text-sm text-red-400 mt-1">{formik.errors.Password}</p>
        )}
      </div>
      <div className="flex flex-col px-4 mb-2 w-full md:w-1/3">
        <label className="font-normal text-xs mb-1" htmlFor="ConfirmPassword">
          ConfirmPassword:
        </label>
        <input
          className="border-2 rounded-md py-1 outline-none px-2"
          id="ConfirmPassword"
          name="ConfirmPassword"
          value={formik.values.ConfirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
        />
      </div>
      <div className="flex justify-start w-full px-4 mb-2 md:w-1/3">
        {formik.errors.ConfirmPassword && formik.touched.ConfirmPassword && (
          <p className="text-sm text-red-400 mt-1">
            {formik.errors.ConfirmPassword}
          </p>
        )}
      </div>
      <button
        className="border px-2 mt-4 rounded-lg w-1/2 py-1 bg-green-200 md:w-1/4 cursor-pointer"
        type="submit"
        disabled={!formik.isValid}
      >
        Register
      </button>
    </form>
  );
};

export default Register;
