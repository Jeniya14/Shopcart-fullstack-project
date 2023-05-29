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
        mobileNumber:"",
        address:""
    })
    const [err,setErr]=useState(false)
    const[emailErr,setemailErr]=useState("")
    const[Passworderr,setpassworderr]=useState(false)
    function handler(e){
        let copy={...register}
        copy[e.target.name]=e.target.value
        
        setRegister(copy)
    }
    
    const history=useHistory()
    function registertration(){
        if (
            !register.name ||
            !register.email ||
            !register.password ||
            !register.address ||
            !register.mobileNumber
          ) {
            setErr("All fields are required to continue");
            return;
          }
          if(!register.email.includes('@','.','com')){
            setemailErr('Please enter the valid email id')
            return;
        }
        if(register.password.length<5){
            setpassworderr(true)
            return;
        }
        axios.post("http://localhost:5000/user",register)
        .then((res)=>{
            if (res.data === "data inserted") {
                history.push("/login");
                setErr("");
              } else if (res.data === "data Already existed") {
                setemailErr("User already exists");
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
               
                <p>Your name</p>
                <input type="text" placeholder="First and last name" style={{width:"380px"}} value={register.name} onChange={handler} name="name" required></input>
                <p>Email</p>
                <input type="text" placeholder="Enter your email" style={{width:"380px"}}value={register.email} onChange={handler} name="email" required></input>
                {emailErr&&<span>{emailErr}</span>}
                <p>Password</p>
                <input type="password" placeholder="At least 6 characters" style={{width:"380px"}} value={register.password} onChange={handler} name="password" required></input>
                {Passworderr&&<span>please enter the password more than five characters</span>}
                <p>Mobile Number</p>
                <input type="text"  value= "+91" disabled style={{width:"30px"}}>
                </input>{' '}
                <input placeholder="Mobile number" value={register.mobileNumber} style={{width:"322px"}} onChange={handler} type='number' name="mobileNumber" required></input>
                <p>Address</p>
                <input placeholder="No.xx,xyz street,pincode" value={register.address} style={{width:"380px"}} onChange={handler} type='name' name="address" required></input>
                <br/><br/>
                {err&& <p style={{textAlign:"center",color:"red"}}>*{err}*</p>}
                <button type ="submit" onClick={registertration}>Continue</button>

                <div>Already have an account? <Link to="/login">Sign in</Link></div>
            </div>
        </div>
        
        </div>
    )
}

export default Register