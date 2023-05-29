import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import pp from "../image/pp.gif"
import "./orderCheckout.css"
function OrderSuccess({onLogin}){
    const history=useHistory()
function BacktoHome(){
    onLogin();
    history.push("/home")
}

    return(
        <div className="maindiv">
            
            <div className="maindiv-div">
            <div><img src={pp} /> </div> 
                <h2>
                Your Order has placed Successfully
                </h2>
                <p>Thank you for your purchase!!</p>
                <Button variant="outlined"  onClick={BacktoHome}>Continue Shopping</Button>
              </div>
        
        </div>
    )
}
export default OrderSuccess