import React from "react";
import Header from "../headerFooter/header";
import "../home/home.css"
import Imageslide from "./imageSlide";
import { useLocation } from "react-router-dom";
import Mobile from "./mobile";
import Footer from "../headerFooter/footer";
import HeaderCategory from "../headerFooter/headercategory";
import Kitchen from "./kitchen";
import Electronics from "./electronics";
import HomeAppliances from "./homeappliance";
import Computer from "./computer";
import Office from "./office";
function Home({onLogout}){
    const location=useLocation();
    const slides=[
        { url:require("../../image/imageslide1.gif"),title:'slide1'},
        { url:require("../../image/imageslide3.jpg"),title:'slide2'},
        { url:require("../../image/imageslide3.jpg"),title:'slide3'}
    ]
    return(
        <div style={{backgroundColor:"#E5CCFF",backgroundAttachment:"fixed"}}>
            <Header value={onLogout} />
            <HeaderCategory />
            <h2>{location.search.id}</h2>
            <Imageslide slides={slides}/>
            <Mobile />
            <Kitchen />
            <Electronics/>
            <HomeAppliances />
            <Computer />
            <Office />
            <Footer />
            
         </div>
    )
}

export default Home