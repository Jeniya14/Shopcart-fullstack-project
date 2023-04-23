import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
import Header from "./headerFooter/header";
import Footer from "./headerFooter/footer";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import { Rating, Stack } from "@mui/material";
// import { StarIcon } from "@mui/icons-material";
function Allitems(){
    const location=useLocation();
    const [product,setProduct]=useState([])
    const history=useHistory();
    const [loading,setloading]=useState(true)
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
    return(
        <div>
            <Header />
            {loading && <p>loading..</p>}
        <div  style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
             {
                product.map((ele)=>{
                    return <div key={ele._id} style={{width:"300px"}}>
                    <img src={ele.img_link} alt={ele.product_name} onClick={()=>detail(ele._id)}></img>
                    <p>{ele.product_name}</p>
                    <span style={{display:'block'}}>{ele.discounted_price}</span>
                    <Stack>
                      < Rating value={ele.rating} precision={0.1} readOnly  />
                    </Stack>
                    <Button variant="contained" color="success" size="small">Order</Button>{'  '} <Button variant="contained" color="success" size="small">Add to cart</Button>
                   
                </div>
                
                })
            }
        </div>
        <Footer />
        </div>
    )
}

export default Allitems