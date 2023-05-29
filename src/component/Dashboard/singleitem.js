import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from 
"react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button,Stack } from "@mui/material";
import { Rating } from "@mui/material";
import Header from "./headerFooter/header";
import HeaderCategory from "./headerFooter/headercategory";
import Footer from "./headerFooter/footer";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import "./singleitem.css"
import Skeleton from '@mui/material/Skeleton';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
import imge from "../image/profile.jpg"
function Singleitem(){
    const location=useLocation();
    const [value, setValue] = useState('1');
    const [cartQuantity,setCartQuantity]=useState(0)
    const [detail,setdetail]=useState({})
    const [loading,setloading]=useState(true)
    const [open,setopen]=useState(false)
    // const [data, setData] = useState([]);
    const history=useHistory();
    useEffect(()=>{
        axios.get('http://localhost:5000/product')
        .then(response => {
            const items = response.data;
            const query = new URLSearchParams(location.search);
            const data = items.find((ele) => ele._id === query.get('id'));
            // console.log(data)
            setdetail(data);
            setloading(false)
        })
        .catch(error => {
            console.log(error);
        });
    },[location.search])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setopen(false);
      }
      const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={1} ref={ref} variant="outlined" {...props} />;
      });
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
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
    return(
        <div>
            <Header count={cartQuantity}/>
            <HeaderCategory />
            <div style={{padding:"50px",backgroundColor:" rgb(243, 241, 241)"}}>
                {
                    loading ?
                   ( <div>
                         <div style={{backgroundColor:"white" ,borderRadius:"5px"}}>
                         <div style={{display:"flex"}}>
                    <div style={{padding:"0px 50px"}}>
                    <Skeleton ariant="rectangular" width={350} height={500}/>
                    </div>
                    <div  style={{padding:"110px 50px"}}>
                    <Skeleton animation="wave"  variant="h1" width={900} height={30} sx={{ fontSize: '1rem' }} />
                    <br />
                     <Skeleton animation="wave"  variant="h1" width={900} height={30} sx={{ fontSize: '1rem' }} />
                    <br />
                    <Skeleton animation="wave"  variant="h2" width={800} height={30} sx={{ fontSize: '1rem' }} />
                    <br />
                     <Skeleton animation="wave"  variant="text" width={500} height={30} sx={{ fontSize: '1rem' }} />
                     <div style={{display:"flex",padding:"5px",marginTop:"30px"}}>
                    <Skeleton animation="wave"  variant="rounded" width={150} height={40} style={{margin:"5px"}} />
                     <Skeleton animation="wave"  variant="rounded" width={200} height={40} style={{margin:"5px"}} />
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>):
                   
                   (
               
                <div style={{backgroundColor:"white" ,borderRadius:"5px"}}>
                <div className="main-div">
                    <div className="main-div-img">
                        <img src={detail.img_link}  alt={detail.product_name} />
                        </div>
                    <div className="main-div-content">
                         <div>{detail.product_name}</div>
                        <p style={{color:"gray",marginTop:"3px"}}>MRP: <s>{detail.actual_price}</s></p>
                         <p style={{fontSize:"25px",fontWeight:"400"}}>Price: {detail.discounted_price}/-</p>
                         <p style={{color:"green"}}>You Save:({detail.discount_percentage} OFF)</p>
                         <span style={{color:"gray",padding:"5px"}}>(inclusive of all taxes)</span>
                    
                         {
                              detail.rating && (
                                <Stack sx={{display:"flex",flexDirection:"row",margin:"15px 0px 15px 0px"}}>
                               < Rating value={detail.rating} precision={0.1} readOnly size="large"  /><span style={{color:"blue",fontSize:"20px"}}>{detail.rating_count} </span>
                           </Stack>                   
                            )
                        }
                   
                         <div >
                         <Button  variant="contained" color="success" size="large" onClick={()=>tocart(detail)}>Buy now</Button>{'  '} <Button  variant="contained" color="success" size="large" onClick={()=>Addtocart(detail)}>Add to cart</Button>
                         <Snackbar  autoHideDuration={3000} open={open} onClose={handleClose}  >
                     <Alert onClose={handleClose} severity="success" sx={{ width: '300px' ,backgroundColor:"rgb(219, 254, 214)"}}>
        Item Added to the cart
        </Alert>
                      </Snackbar>
                         </div>
                    </div>
                     </div>  
                <hr style={{color:" rgb(250, 248, 251)",margin:"10px"}} />
                <div style={{padding:"30px", marginTop:"30px"}}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                 <TabList onChange={handleChange}   aria-label="lab API tabs example">
                                    <Tab label="Product Description" value="1" />
                                    <Tab label="Product Reviews" value="2" />           
                                 </TabList>
                            </Box>
                            <TabPanel value="1">{detail.about_product } </TabPanel>
                            <TabPanel value="2">
                             
                              <div>
                                {detail.review_content.split('.,').map((sentence, sentenceIndex) => (
                                  <div > 
                                   <div style={{display:"flex",flexDirection:"row"}}> <img src={imge} style={{height:"40px",paddingRight:"10px"}} /> 
                                    <p style={{marginBlockStart:"10px",color:"blue"}}>User</p> </div>
                                     <p className="review-content" key={sentenceIndex}>{sentence.trim()}</p>
                                     <hr />
                                    </div>
                                    ))}
                                </div>

                            </TabPanel>       
                          </TabContext>
                    </Box>
                </div>
                        </div>
                   )
            }
            </div>
         
            <Footer />
        </div>
    )
}

export default Singleitem