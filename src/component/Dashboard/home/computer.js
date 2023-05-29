import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "../home/home.css"
import {Button,Typography} from "@mui/material"
function Computer() {
  const [data, setData] = useState([]);
  const history=useHistory();
  useEffect(() => {
    axios.get('http://localhost:5000/product')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);
  
  function prevImage(){
    let box=document.querySelector('.card-image-computer')
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width;
}
function nextImage(){
    let box=document.querySelector('.card-image-computer')
    let width=box.clientWidth;
    box.scrollLeft=box.scrollLeft+width;
}
function detail(id){
  history.push(`/singleitem?id=${id}`)
}
function Allitems(category){
  history.push(`/allitem?name=${encodeURIComponent(category)}`);
}
  const computer = data.filter(ele => ele.category && ele.category.includes('Computers&Accessories'))

  return (
    <div className='category-main'>
      <div className='category-head category-head-computer'><Typography variant="h4"> Computer Accessories</Typography>
      <Button variant="contained"  onClick={()=>Allitems('Computers&Accessories')} >Veiw All</Button>
      </div>

      <div className="main-image">
        <button className="leftImageArrowStyles" onClick={()=>prevImage()}> ❰❰</button>
        <button className="rightImageArrowStyles" onClick={()=>nextImage()}> ❱❱</button>
    <div className='card-image-computer'>
      {
      computer.slice(0,10).map(ele => (
        <div key={ele._id} className='Perslide'>
            <img src={ele.img_link}  alt={ele.product_name} onClick={()=>detail(ele._id)} />
          <p>{ele.product_name.split(" ").slice(0, 2).join(" ")}</p> 
          <p style={{color:'green'}}>Only at {ele.discounted_price}</p>
        </div>
      )) 
      }
    </div>
    </div>
    </div>
  );
}
export default Computer;
