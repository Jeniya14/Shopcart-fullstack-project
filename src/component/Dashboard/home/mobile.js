import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import "../home/home.css"
function Mobile() {
  const [data, setData] = useState([]);
  const history=useHistory();
  useEffect(() => {
    axios.get('http://localhost:5000/product')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);
  function prevImage(){
    let box=document.querySelector('.card-image')
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width;
}
function nextImage(){
    let box=document.querySelector('.card-image')
    let width=box.clientWidth;
    box.scrollLeft=box.scrollLeft+width;
}
function detail(id){
  history.push(`/singleitem?id=${id}`)
}
function Allitems(category){
  history.push(`/allitem?name=${encodeURIComponent(category)}`);
}
  const mobile = data.filter(ele => ele.category && ele.category.includes('Mobiles&Accessories'))

  return (
    <div className='category-main'>
      <div className='category-head'><p> Best of Mobile</p>
      <button onClick={()=>Allitems('Mobiles&Accessories')} >Veiw All</button>
      </div>

      <div className="main-image">
        <button className="leftImageArrowStyles" onClick={()=>prevImage()}> ❰❰</button>
        <button className="rightImageArrowStyles" onClick={()=>nextImage()}> ❱❱</button>
    <div className='card-image'>
      {
      mobile.slice(0,10).map(ele => (
        <div key={ele._id} className='Perslide'>
            <img src={ele.img_link}  alt={ele.product_name} onClick={()=>detail(ele._id)} />
          <p>{ele.product_name.split("|").slice(0, 1).join("|").split(" ").slice(0, 2).join(" ")}</p> 
          <p style={{color:'green'}}>Only at {ele.discounted_price}</p>
        </div>
      )) 
      }
    </div>
    </div>
    </div>
  );
}
export default Mobile;
