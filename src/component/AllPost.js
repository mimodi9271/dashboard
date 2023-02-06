import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { json } from "react-router";

const Allpost = ({token}) => {
  const { Posts } = useSelector((state) => state.Post);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts/", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => dispatch({ type: "LoadData", payload: res.data }))
      .catch((err) => console.log(err));
  }, [Posts]);

  return (
    <div className=" md:col-span-5">
      {Posts.length > 0 ? (
        Posts.map((item) => {
          return (
            <div
              key={item._id}
              className="bg-slate-200 rounded-md md:col-span mb-2"
            >
              {item.title}
            </div>
          );
        })
      ) : (
        <p>loading ...</p>
      )}
    </div>
  );
};

export default Allpost;
