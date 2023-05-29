import React from "react";
import axios from "axios";
import { useEffect,useState } from "react";
import Header from "./headerFooter/header";
import Footer from "./headerFooter/footer";
import HeaderCategory from "./headerFooter/headercategory";
import { Link, useHistory } from "react-router-dom";
import "./cart.css";
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
function Cart(){
let [cartItem,setcartItem]=useState([])
const [order,setorder]=useState([])
const history =useHistory();
const userEmail = JSON.parse(sessionStorage.getItem('user'));
let email = userEmail.email;
useEffect(() => {
    const fetchCartItems = async () => {
       try{ const response = await axios.get(`http://localhost:5000/cart/${email}`);
        const cartItems = response.data.items;
        setcartItem(cartItems)}
        catch(err){
          console.log(err)
        }
    };
    fetchCartItems();
    const fetchorderItems = async () => {
      const response = await axios.get(`http://localhost:5000/order/${email}`);
      const orderItems = response.data.items;
      setorder(orderItems)
  };
  fetchorderItems();
  }, []);
  async function fetchDatatoDel(itemId) {
      await axios.delete(`http://localhost:5000/cart/?itemId=${itemId}&email=${email}`);
      setcartItem(ele => ele.filter(item => item.itemId !== itemId));   
  }
  async function deletedata(itemId) {
    await axios.delete(`http://localhost:5000/order/?itemId=${itemId}&email=${email}`);
    setorder(ele => ele.filter(item => item.itemId !== itemId));   
}
  async function clearCart() {
     await axios.delete(`http://localhost:5000/cart/clear/${email}`);
    setcartItem([]);
  }  
  function detail(id){
    history.push(`/singleitem?id=${id}`)
  }
  const total = cartItem && cartItem.length > 0
  ? cartItem.reduce((accumulator, item) => {
      const itemPrice = parseFloat(item.itemPrice.replace(/[^0-9.-]+/g, ''));
      return accumulator + (itemPrice * item.quantity);
    }, 0)
  : 0;
  async function increaseQuantity(itemId) {
    try {
      await axios.patch(`http://localhost:5000/cart/increase/${itemId}`, { email });
      setcartItem(ele => {
        return ele.map(item => {
          if (item.itemId === itemId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      })
    } catch (error) {
      console.log(error);
    }
  }
  async function decreaseQuantity(itemId) {
    await axios.patch(`http://localhost:5000/cart/increase/${itemId}`, { email });
    setcartItem(ele => {
      return ele.map(item => {
        if (item.itemId === itemId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        } else {
          return item;
        }
      });
    });
  }
  function Checkoutpage(){
    
    history.push("/orderCheckout")
  }
    return(
        <div>
            <Header />
            <HeaderCategory />
            <div className="cart"><h1 style={{padding:'10px'}}>Shopping cart</h1>
            {
            cartItem && cartItem.length === 0 ? (
        <div style={{ marginBottom: '165px', padding: '10px' }}>
          <p>Your cart is currently empty</p>
          <Link to="/home" style={{ color: "purple", textDecoration: "underline", cursor: "pointer" }}>← Continue shopping</Link>
        </div>
      ):(
                    <div className="cart-main">
                        <div className="cart-main-head">
                            <h3 className="cart-main-head-product">Product</h3>
                            <h3  className="cart-main-head-price">Price</h3>
                            <h3  className="cart-main-head-quantity">Quantity</h3>
                            <h3  className="cart-main-head-total">Total</h3>
                            <h3 style={{color:" rgba(229, 210, 239, 0.9)"}}>sssdfwsjd</h3>
                       </div>
                        {
                              cartItem && cartItem.map((cartItems) =>(
                                    <div key={cartItems.itemId} className="cart-main-body">
                                     <div className="cart-main-body-div">
                                        <img src={cartItems.itemImg}   alt={cartItems.itemName} onClick={()=>detail(cartItems.itemId)} /> 
                                     <div style={{paddingLeft:'20px'}}>
                                     <h3 >{cartItems.itemName.split("|").slice(0, 1).join("|").split(",").slice(0, 1).join(",").split(" ").slice(0, 9).join(" ")}</h3>
                                     </div>
                                     </div>
                                     <div className="cart-main-body-div2">{cartItems.itemPrice}</div>
                                     <div className="quantity">
                                     <button onClick={() => decreaseQuantity(cartItems.itemId)}>-</button>
                                     {cartItems.quantity}
                                        <button onClick={() => increaseQuantity(cartItems.itemId)}>+</button>
                                    </div>
                                     <div className="cart-main-body-div2">
                                        <div style={{color:'green',fontSize:'23px'}}>₹{cartItems.quantity*parseInt(cartItems.itemPrice.replace(/\D/g, ''))} </div>
                                       
                                     </div>
                                      <IconButton  color="danger"  onClick={()=>fetchDatatoDel(cartItems.itemId)} style={{height:"40px"}}><DeleteOutlineIcon  /></IconButton>
                                    </div>
                            ))
                        }
                        <div style={{display:'flex',justifyContent:'space-between',width:'1100px',marginLeft:'10px'}}>
                            <div>
                               <Button variant="outlined"   onClick={clearCart}> Clear cart </Button>
                            </div>
                            <div>
                          
                                <p><b style={{fontSize:'23px'}}>Subtotal:<span style={{fontSize:'23px',}}> ₹{total.toFixed(2)}</span></b>  <span style={{fontSize:'12px'}}>*including all taxes*</span> </p>
                                <button className="Order-button " onClick={Checkoutpage}>Order</button>
                            </div>
                        </div>
                    </div>
                )
            } 
            </div>
            <div className="maindiv-preorder">
             <h1> Previously Purchased Items</h1>
                    <div >
                    {order && order.length !== 0 ? (
  <div>
  {
     order.map((ele,index) => (
       <div key={`${ele.itemId}-${index}`} className="cart-main-body">
       <div >
         <img src={ele.itemImg} alt={ele.itemName}  onClick={()=>detail(ele.itemId)} style={{width:"150px",height:"150px"}} />
           </div>
           <p style={{width:"400px"}}>{ele.itemName.split("|").slice(0, 1).join("|")}</p>
           <div style={{ paddingLeft: '5px' }}>
           <p>{ele.itemPrice}</p>
           
           </div>
           
           <IconButton  color="danger" onClick={() => deletedata(ele.itemId)} style={{height:"50px"}}><DeleteOutlineIcon fontSize="large"  /></IconButton>
        
       </div>
   ))
   }
</div>
) : (
  <p>You haven't ordered anything yet</p>       
                   ) }
                     
                    </div>
            </div>
             <Footer />
        </div>
    )
}
export default Cart