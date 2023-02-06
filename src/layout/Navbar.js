import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const {Auth} = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const exitHandler = () => {
    dispatch({type : "exit" , payload : null});
    localStorage.setItem("AUTH" , null);
    localStorage.setItem("TOKEN" , null)
  }

  useEffect(()=>{
    if(!Auth) navigate("/")
  } , [Auth])
  
  return (
    <header className="bg-slate-300 p-2 md:px-28 font-normal text-xs">
      <ul className="flex justify-between items-center">
        <div className="flex">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/log">
            {!Auth ? <li className="ml-2">Login</li> : null}
          </Link>
          <Link to="/reg">
            {!Auth ? <li className="ml-3">Signup</li> : null}
          </Link>
          <Link to={{ pathname: "/log", search: "prof" }}>
            <li className="ml-3">Dashboard</li>
          </Link>
          <Link>{Auth ? <li className="ml-3" onClick={()=>exitHandler()}>exit</li> : null}</Link>
        </div>
        <div className="flex justify-center items-center">
          <img src={logo} className="w-8 h-8" />
        </div>
      </ul>
    </header>
  );
};

export default Navbar;
