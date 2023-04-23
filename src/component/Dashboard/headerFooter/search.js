import React from "react";
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import { Rating, Stack } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
function Search(){
    let history=useHistory()
    let location=useLocation()
    const [loading,setloading]=useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const query = new URLSearchParams(location.search).get("query");
    
    useEffect(() => {
      axios.get(`http://localhost:5000/product/filter/${query}`)
        .then((res) => {
          setFilteredProducts(res.data);
            setloading(false)
        })
        .catch((err) => console.log(err));
    }, [query]);
    function detail(id){
        history.push(`/singleitem?id=${id}`)
      }
    return(
        <div>
            <Header />
             { loading?(<p>Loading...</p>):(
                 <div  style={{display:"flex",flexWrap:"wrap",width:"100%"}}>
             {
               filteredProducts.map((ele)=>{
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
        </div>)}
        <Footer />
        </div>
    )
}
export default Search