import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import cooking from "../../image/cooking.png"
import gadgets from "../../image/gadgets.jpeg"
import mobile from "../../image/Mobile.png"
import computer from "../../image/computer.png"
import appliance from "../../image/e-appliance.png"
import officeimg from "../../image/office.png"
import "../headerFooter/header.css"
function HeaderCategory(){
    const history=useHistory();
    const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/product')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);
  function Allitems(category){
    history.push(`/allitem?name=${encodeURIComponent(category)}`);
  }

    return(
        <div>
                   <div className="header-2" >
            <div onClick={()=>Allitems('Kitchen&HomeAppliances')} >
                <img src={cooking} className="header-img" alt='Cooking'></img>
                <p>Cooking appliance</p>
            </div>
            <div onClick={()=>Allitems('Electronics')}>
                <img src={gadgets} className="header-img" alt='Electronics'></img>
                <p>Electronic gadgets</p>
            </div>
            <div onClick={()=>Allitems('Mobiles&Accessories')}>
                <img src={mobile} className="header-img" alt='mobile Accesories'></img>
                <p>Mobile Accessories</p>
            </div>
            <div  onClick={()=>Allitems('Home&Kitchen')} >
                <img src={appliance} className="header-img" alt='home appliance'></img>
                <p>Home appliance</p>
            </div>
            <div  onClick={()=>Allitems('Computers&Accessories')}  >
                <img src={computer} className="header-img" alt='Laptop'></img>
                <p>Laptop Accessories</p>
            </div>
            <div  onClick={()=>Allitems('OfficeProducts')}>
                <img src={officeimg} className="header-img" alt='Office product' ></img>
                <p>Office Products</p>
            </div>
        </div>
        </div>
    )
}
export default HeaderCategory