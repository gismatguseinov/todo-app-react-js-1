import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Login from "./Login/Login";
import SiderBar from "./Sidebar/Sidebar";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(()=>{
    if(token){
      setIsLogin(true)
    }
  },[isLogin])
  return (
    <div className="App" id="App">
      <Router>
        <Route  path="/login" component={Login} />
        <ProtectedRoute  path="/" component={SiderBar} />
      </Router>
    </div>
  );
}

export default App;
