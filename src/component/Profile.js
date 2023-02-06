import { useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router";
import AddPost from "./AddPost";
import Allpost from "./AllPost";

const Profile = () => {
    // const {Auth} = useSelector(state => state.Auth);
    // const navigate = useNavigate();
    const[isshow , setIsshow] = useState(true)
    const token  = localStorage.getItem("TOKEN")

    return ( 
    <section className="grid md:grid-cols-7 my-4 gap-y-4 px-2 md:px-12 md:gap-x-8">
        <div className="md:col-span-2 bg-slate-200 flex md:flex-col justify-between md:justify-center md:gap-y-8 items-center p-8 md:h-52 w-full rounded-lg gap-x-2">
            <button className="border-2 py-1 border-black rounded-lg bg-indigo-300 w-1/2" onClick={() => setIsshow(true)}>All state</button>
            <button className="border-2 py-1 border-black rounded-lg bg-indigo-300 w-1/2" onClick={()=> setIsshow(false)}>Add state</button>
        </div>
        {isshow ? <Allpost token={token}/> : <AddPost setIsshow={setIsshow} token={token}/>}
        
    </section> 
    );
}
 
export default Profile;