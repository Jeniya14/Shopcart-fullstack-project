import React from "react";
import "../register/register.css"
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '../image/logo1.png'
import axios from "axios";
function Register(){
    const [register,setRegister]=useState({
        name:"",
        password:"",
        email:"",
        mobileNumber:""
    })
    const [err,setErr]=useState(false)
    function handler(e){
        let copy={...register}
        copy[e.target.name]=e.target.value
        
        setRegister(copy)
    }
    const history=useHistory()
    function registertration(){
        axios.post("http://localhost:5000/user",register)
        .then((res)=>{
            console.log(res.data)
            if(res.data=='data inserted'){
                history.push('/login')
                setErr(false)
            }
            else{
                setErr(true)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
       
    }
    return(
        <div className="register-body">
        <div className="register-main"> 
            <img src={logo} alt="logo"></img>
             
            <div  >
                <h2>Create Account</h2>
               {err&& <p>User Already existed</p>}
                <p>Your name</p>
                <input type="text" placeholder="First and last name" style={{width:"380px"}} value={register.name} onChange={handler} name="name" required></input>
                <p>Email</p>
                <input type="text" placeholder="Enter your email" style={{width:"380px"}}value={register.email} onChange={handler} name="email" required></input>
                <p>Password</p>
                <input type="password" placeholder="At least 6 characters" style={{width:"380px"}} value={register.password} onChange={handler} name="password" required></input>
                <p>Mobile Number</p>
                <input type="text"  value= "+91" disabled style={{width:"30px"}}>
                </input>{' '}
                <input placeholder="Mobile number" value={register.mobileNumber} style={{width:"322px"}} onChange={handler} type='number' name="mobileNumber" required></input>

                <br/><br/>
                <button type ="submit" onClick={registertration}>Continue</button>

                <div>Already have an account? <Link to="/login">Sign in</Link></div>
            </div>
        </div>
        
        </div>
    )
}

export default Register