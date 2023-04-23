import React from "react";
import { useEffect } from "react";
import { useLocation } from 
"react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";
import { Rating } from "@mui/material";
import Header from "./headerFooter/header";
import Footer from "./headerFooter/footer";
function Singleitem(){
    const location=useLocation();
    const [detail,setdetail]=useState({})
    // const [data, setData] = useState([]);
    // const history=useHistory();
    useEffect(()=>{
        axios.get('http://localhost:5000/product')
        .then(response => {
            const items = response.data;
            const query = new URLSearchParams(location.search);
            const data = items.find((ele) => ele._id === query.get('id'));
            // console.log(data)
            setdetail(data);
        })
        .catch(error => {
            console.log(error);
        });
    },[location.search])
    return(
        <div>
            <Header />
            <br />
            <div>
           
            {
                <div> <img src={detail.img_link}  alt={detail.product_name} />
                 <p>{detail.product_name}</p>
                    <span style={{display:'block'}}>{detail.discounted_price}</span>
                    <div>{detail.about_product} </div>
                    {
                    detail.rating && (
                         <Rating value={detail.rating} precision={0.5} readOnly />                     
                    )
                    }
                     <span >{detail.rating_count} Rating</span>
                     <div>
                    <Button variant="contained" color="success" size="small">Order</Button>{'  '} <Button variant="contained" color="success" size="small">Add to cart</Button>
                    </div>
                   
                    </div>
                   
            }
            </div>
            <br />
            <Footer />
        </div>
    )
}

export default Singleitem