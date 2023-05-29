import React, { useState,useEffect  } from "react";
import Header from "./headerFooter/header";
import Footer from "./headerFooter/footer";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useHistory } from "react-router-dom";
import "./orderCheckout.css"
function OrderCheckout(){
    const [userdetails,setuserdetails]= useState({})
    const [cartvalue,setcartvalue]= useState([])
    const user=JSON.parse (sessionStorage.getItem('user') );
     const emailId=user.email;
     const history=useHistory()
     const total = cartvalue.reduce((accumulator, item) => {
        const itemPrice = parseFloat(item.itemPrice.replace(/[^0-9.-]+/g, ''));
        return accumulator + (itemPrice * item.quantity);
      }, 0);
    useEffect(() => {
        if (user) {
          axios.get(`http://localhost:5000/user/${user.email}`)
            .then(res => setuserdetails(res.data))
            .catch(err => console.log(err));
    
          axios.get(`http://localhost:5000/cart/${user.email}`)
            .then(response => {
              const cartItems = response.data.items;
              setcartvalue(cartItems);
            })
            .catch(err => console.log(err));
        }
      }, []);
       async function fetchDatatoDel(itemId) {
        await axios.delete(`http://localhost:5000/cart/?itemId=${itemId}&email=${emailId}`);
        setcartvalue(ele => ele.filter(item => item.itemId !== itemId));   
    }
      const CartItemInCart = () => {
         if (Array.isArray(cartvalue)) {
            return cartvalue.map((cartItems) => (
                <div key={cartItems.itemId} className="oredrCheck-main">
                <div >
                  <img src={cartItems.itemImg} alt={cartItems.itemName}  style={{width:"150px",height:"150px"}}  />
                  <div style={{ paddingLeft: '5px' }}>
                    <p  style={{width:"500px",paddingLeft:"10px"}}>{cartItems.itemName.split("|").slice(0, 1).join("|").split(",").slice(0, 1).join(",").split(" ").slice(0, 16).join(" ")}</p>
                    <p style={{paddingLeft:"10px",color:"green"}}>{cartItems.itemPrice}</p>
                    </div>
                    <IconButton  color="danger" onClick={() => fetchDatatoDel(cartItems.itemId)} style={{height:"50px",marginLeft:"40px"}}><DeleteOutlineIcon fontSize="large"  /></IconButton>
                  </div>
                </div>
            ));
          } else {
            return null; 
          }
      };
    const steps = [
        {
          label: 'Delivery Address',
          description: 
          (
            <div className="address-css">
              <div ><b>Name:</b> <span >{userdetails.name}</span></div>
              <div><b>Mobile Number:</b> <span>{userdetails.mobileNumber}</span></div>
              <div><b>Address:</b> <span style={{display:"block"}}>{userdetails.address}</span></div>
              <br/>
            </div>
          )
        },
        {
          label: 'Order Summary',
          description:
          CartItemInCart(),
        },
        {
          label: 'Payment Option',
          description: 
          (
            <div>
              <span style={{fontSize:'20px',color:"green"}}> Total Amout : ₹{total.toFixed(2)}</span>
              <br />
              <br/>
              <div style={{fontSize:'20px'}}><input type="radio" checked / >Cash on Delivery</div>
              <br/>
            </div>
          ),
        },
      ];
        const [activeStep, setActiveStep] = React.useState(0);
        const handleNext = () => {
           if (activeStep === steps.length - 1) {
            
            cartvalue.forEach((cartItem) => {
                axios.post('http://localhost:5000/order', {
                  email: emailId,
                  itemId: cartItem.itemId,
                  itemName: cartItem.itemName,
                  itemPrice: cartItem.itemPrice,
                  itemImg: cartItem.itemImg,
                  quantity: cartItem.quantity
                })
                .then((response) => {
                  console.log("Order placed successfully!");
                })
                .catch((error) => {
                  console.error("Error placing order:", error);
                });
            });
        axios.delete(`http://localhost:5000/cart//clear/${emailId}`)
      .then(() => {
        console.log("Cart emptied successfully!");
      })
      .catch((error) => {
        console.error("Error emptying cart:", error);
      });
                history.push('/orderSuccessfully');
          } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        };
        const handleBack = () => {
          setActiveStep((prevActiveStep) => prevActiveStep - 1);
        };      
 return(
    <div className="main-order">
        <Header/>
            <div style={{padding:"100px 300px",backgroundColor:" rgb(245 239 249)"}}>
            <Box sx={{ maxWidth: 850,backgroundColor:"white",padding:"50px",borderRadius:"5px" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel optional={index === 2 ? (<Typography variant="caption">Last step</Typography>) : null}>
             <div style={{fontSize:"24px"}}>{step.label}</div> 
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 1 }}>
                <div>
                  <Button variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Order' : 'Continue'}
                  </Button>
                  <Button disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      </Box>
            </div>
        <Footer/>
    </div>
 )
}
export default OrderCheckout