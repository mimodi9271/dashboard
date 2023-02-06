import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const Homepage = () => {
  // const { Posts } = useSelector((state) => state.Post);
  const [Posts, setPosts] = useState([]);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: "AuthInitial",
      payload: JSON.parse(localStorage.getItem("AUTH")) || null,
    });
    
    axios
      .get("http://localhost:5000/api/allpost")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err.code));
  }, []);

  return (
    <section className="grid gap-y-8 mt-2 mb-8 p-4 bg-slate-100 md:grid-cols-2 md:gap-x-8">
      {Posts.length > 0 ? (
        Posts.map((item) => {
          return (
            <div className="mb-2 bg-slate-300" key={item._id}>
              <p>{item.title}</p>
              <p>{item.description}</p>
            </div>
          );
        })
      ) : (
        <p>loading ...</p>
      )}
    </section>
  );
};

export default Homepage;
