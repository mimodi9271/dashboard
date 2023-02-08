import { useFormik } from "formik";
import * as yup from "yup";
// import { ImageInput ,file } from "formik-file-and-image-input/lib";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import axios from "axios";
import { useSelector } from "react-redux";

const initalValues = {
  title: "",
  // Image: "",
  description: "",
};

const validationSchema = yup.object({
  title: yup.string().required("Title is neccesery"),
  // Image: yup.string().required("image is neccessary"),
  description: yup.string().required("Desc is neccesery"),
});

const AddPost = ({ setIsshow, token }) => {
  const { PostError } = useSelector((state) => state.Post);
  const dispatch = useDispatch();
  // const imageFormats = ["image/png", "image/svg", "image/jpeg"];
  // const {Auth} = useSelector(state => state.Auth)

  const onSubmit = (values) => {
    axios
      .post("http://localhost:5000/api/posts", values, {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        dispatch({ type: "Addpost", payload: res.data });
        setIsshow(true);
      })
      .catch((err) => dispatch({ type: "errpostdis", payload: err.response.data }));
  };

  // dispatch({type : "errpostdis" , payload : err.response.data})

  const formik = useFormik({
    initialValues: initalValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className=" px-2 md:col-span-5">
      <form
        className="flex flex-col items-center"
        onSubmit={formik.handleSubmit}
      >
        <div className="flex flex-col px-4 my-2 w-full md:w-1/3">
          <label className="font-normal text-xs mb-1" htmlFor="title">
            Title:
          </label>
          <input
            className="border-2 rounded-md py-1 outline-none px-2"
            id="title"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
          />
        </div>
        <div className="flex justify-start w-full px-4 mb-2 md:w-1/3">
          {formik.errors.title && formik.touched.title && (
            <p className="text-sm text-red-400 mt-1">{formik.errors.title}</p>
          )}
        </div>
        {/* <div className="flex flex-col px-4 my-2 w-full md:w-1/3">
          <label className="font-normal text-xs mb-1" htmlFor="Image">
            Image:
          </label>
          <input
            className="border-2 rounded-md py-1  w-full outline-none px-2"
            id="Image"
            name="Image"
            value={formik.values.Image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="file"
          />
        </div>
        <div className="flex justify-start w-full px-4 mb-2 md:w-1/3">
          {formik.errors.Image && formik.touched.Image && (
            <p className="text-sm text-red-400 mt-1">{formik.errors.Image}</p>
          )}
        </div> */}
        <div className="flex flex-col px-4 mb-2 w-full md:w-1/3">
          <label className="font-normal text-xs mb-1" htmlFor="description">
            description:
          </label>
          <input
            className="border-2 rounded-md py-1 outline-none px-2"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
          />
        </div>
        <div className="flex justify-start w-full px-4 mb-2 md:w-1/3">
          {formik.errors.description && formik.touched.description && (
            <p className="text-sm text-red-400 mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>
        <button
          className="border px-2 mt-4 rounded-lg w-1/2 py-1 bg-green-200 md:w-1/4 cursor-pointer"
          type="submit"
          disabled={!formik.isValid}
        >
          Add post
        </button>
        <p>{PostError}</p>
      </form>
    </div>
  );
};

export default AddPost;
