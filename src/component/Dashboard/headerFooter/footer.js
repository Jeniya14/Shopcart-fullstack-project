import React from "react";
import '../headerFooter/footer.css'
// import { useHistory } from "react-router-dom";
import insta from '../../image/instagram.png'
import whatsapp from '../../image/whatsapp.png'
import linkedin from '../../image/likedin.png'
import pintrest from '../../image/pintrest.png'
import youtube from '../../image/youtube.png'
import twitter from '../../image/twitter.png'
import { Link } from "react-router-dom";
import logo from '../../image/mainlogo.png'
function Footer(){

    return(
        <div className="footer">
              <img src={logo} className='flogo'></img>
              <div className="footer-main">
                <div>
                    <h4>Company</h4>
                    <ul>
                        <li>About us</li>
                        <li>Team</li>
                        <li>Help & Support</li>
                    </ul>
                </div>
                <div>
                    <h4>Pages</h4>
                    <ul>
                        <li><Link to={'/home'} className='linkto'>Home</Link></li>
                        <li><Link to={'/home'} className='linkto'>Home</Link></li>
                        <li><Link to={'/home'} className='linkto'>Home</Link></li>
                    </ul>
                </div>
                <div>
                    <h4>Categories</h4>
                    <ul>
                        <li >Category1</li>
                        <li>Category1</li>
                        <li>Category1</li>
                    </ul>
                </div>
                <div>
                    <h4>Places</h4>
                    <ul>
                        <li>Tamil Nadu</li>
                        <li>Kerala</li>
                        <li>Karnataka</li>
                    </ul>
                </div>
                <div>
                    <h4>Contact us</h4>
                    <a href="#"><img src={insta} className='footerimg' ></img></a>
                    <a href="#"><img src={whatsapp}  className='footerimg'></img></a>
                    <a href="#"><img src={pintrest} className='footerimg' ></img></a>
                    <a href="#"><img src={linkedin} className='footerimg' ></img></a>
                    <a href="#"><img src={youtube} className='footerimg' ></img></a>
                    <a href="#"><img src={twitter} className='footerimg' ></img></a>
                </div>
              
              </div>
              <p>Copyrights@2023</p>
        </div>
    )
}

export default Footer