import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
import Header from "./headerFooter/header";
import Footer from "./headerFooter/footer";
import { useHistory } from "react-router-dom";
import "./allitem.css"
import Button from '@mui/material/Button';
import { Rating, Stack } from "@mui/material";
import HeaderCategory from "./headerFooter/headercategory";
import Skeleton from '@mui/material/Skeleton';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
function Allitems(){
    const location=useLocation();
    const [product,setProduct]=useState([])
    const history=useHistory();
    const [open,setopen]=useState(false)
    const [loading,setloading]=useState(true)
    const [cartQuantity,setCartQuantity]=useState(0)
    const divArray = Array.from({ length: 10}, (_, i) => i + 1);
    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const category = query.get('name');
        axios.get('http://localhost:5000/product')
          .then(res => {
            const items = res.data;
            const data = items.filter(ele => ele.category && ele.category.includes(category));
            setProduct(data);
            setloading(false)
          })
          .catch(err => console.log(err));
      }, [location.search]);
      function detail(id){
        history.push(`/singleitem?id=${id}`)
      }
      function Addtocart(ele){
        const user = JSON.parse(sessionStorage.getItem('user'));
        axios
          .post('http://localhost:5000/cart/add', {
            email: user.email,
            itemId: ele._id,
            itemName: ele.product_name,
            itemPrice: ele.discounted_price,
            itemImg:ele.img_link,
            quantity: 1
          })
          .then((response) => {
            console.log(response.data);
            setCartQuantity(+response.data.count);
            setopen(true)
          })
          .catch((error) => {
            console.log(error);
          });
      }
      function tocart(ele){
        history.push("/cart")
        const user = JSON.parse(sessionStorage.getItem('user'));
        axios
          .post('http://localhost:5000/cart/add', {
            email: user.email,
            itemId: ele._id,
            itemName: ele.product_name,
            itemPrice: ele.discounted_price,
            itemImg:ele.img_link,
            quantity: 1
          })
          .then((response) => {
            console.log(response.data);
         
            setopen(true)
          })
          .catch((error) => {
            console.log(error);
          });
      }
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setopen(false);
      }
      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={1} ref={ref} variant="outlined" {...props} />;
      });
    return(
        <div>
            <Header count={cartQuantity}/>
            <HeaderCategory />
            {loading &&  
              
               <div className="All-item">
               { divArray.map((item) => (
               <div className="Perslides" key={item}>
               <Skeleton animation="wave"  variant="rectangular" width={230} height={200}  />
              
               <Skeleton animation="wave"  variant="text" width={230} height={30} sx={{ fontSize: '1rem' }} />
               <Skeleton animation="wave"  variant="text" width={230} height={30} sx={{ fontSize: '1rem' }} />
               <Skeleton animation="wave"  variant="text" width={230} height={30} sx={{ fontSize: '1rem' }} />
               <div style={{display:"flex",padding:"5px",marginTop:"30px"}}>
               <Skeleton animation="wave"  variant="rounded" width={100} height={40} style={{margin:"5px"}} />
               <Skeleton animation="wave"  variant="rounded" width={120} height={40} style={{margin:"5px"}} />
               </div>
               </div>
               )) }
             </div>
             
           
            
            }
        <div className="All-item">
             {
                product.map((ele)=>{
                    return <div key={ele._id} className="Perslides">
                   
                    <img src={ele.img_link} alt={ele.product_name} onClick={()=>detail(ele._id)}></img>
                    <p onClick={()=>detail(ele._id)}>{ele.product_name.split("|").slice(0, 1).join("|").split(",").slice(0, 1).join(",").split(" ").slice(0, 6).join(" ")}</p>
                    <span style={{fontSize:"25px",fontWeight:"400"}}>{ele.discounted_price}</span>{" "}<s>{ele.actual_price}</s>{" "}<span style={{color:"green"}}>({ele.discount_percentage} off)</span>
                    {
                      ele.rating &&
                      (<Stack sx={{display:"flex",flexDirection:"row",margin:"5px 0px"}}>
                      < Rating value={ele.rating} precision={0.1} readOnly size="small"  /><span style={{color:"blue",fontSize:"14px"}}>{ele.rating_count} </span>
                    </Stack>)}
                    <div className="Perslides-button">
                    <Button variant="contained" color="success" size="small" onClick={()=>tocart(ele)}>Buy now </Button>{''} <Button variant="contained" color="success" size="small" onClick={()=>Addtocart(ele)}>Add to cart</Button>
                     <Snackbar  autoHideDuration={3000} open={open} onClose={handleClose}  >
                     <Alert onClose={handleClose} severity="success" sx={{ width: '300px' ,backgroundColor:"rgb(219, 254, 214)"}}>
        Item Added to the cart
        </Alert>
                      </Snackbar>
                    </div>
                   
                </div>
                
                })
            }
        </div>
        <Footer />
        </div>
    )
}

export default Allitems