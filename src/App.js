import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./layout/Layout";
import Homepage from "./component/Homepage";
import Profile from "./component/Profile";
import Login from "./component/Login";
import Register from "./component/Register";
import { Provider } from 'react-redux';
import store from "./Redux/Store";



function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/prof" element={<Profile />} />
          <Route path="/log" element={<Login />} />
          <Route path="/reg" element={<Register />} />
        </Routes>
      </Layout>
    </Provider>
  );
}

export default App;
