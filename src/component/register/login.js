import React from "react";
import "./register.css"
import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from '../image/logo1.png'

function Login({onLogin}){
    const history=useHistory()
    const [login,setLogin]=useState({
        email:"",
        password:""
    })
    // const [email,setemail]=useState('')
    // const [password,setpassword]=useState('')
    const [err,setErr]=useState(false)
    function handler(e){
        let copy={...login}
        copy[e.target.name]=e.target.value
        setLogin(copy)
    }
     function Loginvalidation(){

       axios.post("http://localhost:5000/user/login",login)

        .then((res)=>{
            console.log(res)

           if(res.data==="existed"){
            setErr(false)
            onLogin();
            history.push("/home")
        }else {
            setErr(true)
            
        } 
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return(
        <div className="login-body">
           <div className="login-main">
                <img src={logo} alt="logo"></img>
                <div>
                <h2>Sign in</h2>
                {err&& <p>Incorrect email or password </p>}
                <p>Email</p>
                <input type="text" placeholder="Enter the username" style={{width:"380px"}} name="email" value={login.email}  onChange={handler} required /> 
                <p>Password</p>
                <input type="password" placeholder="Enter the Password" style={{width:"380px"}} name="password" value={login.password}  onChange={handler}  required/>
                <br />
                <button onClick={Loginvalidation}>Continue</button>
                <Link to="/">Sign up</Link>
                </div>
           </div>
        </div>
    )
}

export default Login