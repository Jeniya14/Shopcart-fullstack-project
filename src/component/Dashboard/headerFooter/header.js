import React, { useState } from "react";
import "../headerFooter/header.css"
import axios from "axios";
import { useEffect } from "react";
import mainlogo from "../../image/mainlogo.png"
import { useHistory } from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Drawer, Typography,Badge } from "@mui/material";
function Header({value}){
    let history=useHistory();
    const [search,setsearch]=useState("")
    let [draweropen,setdraweropen]=useState(false)
    const [Profiledetail,setprofiledetail]=useState({})
    useEffect(() => {
        axios.get('http://localhost:5000/users')
          .then(res => setprofiledetail(res.data))
          .catch(err => console.log(err));
      }, []);
    function Logout(){
        value()
    }
    function gotoHome(){
        history.push("/home")
    }
    function SearchChange(e){
        setsearch(e.target.value)
    }
    function SearchSubmit(){
        history.push(`/search?query=${search}`);
    }
    return(
        <div>
        <div className="header">
            <img src={mainlogo}></img>
            <div>
                <input type='text' value={search} className="search-input" placeholder="Search for products and more.."
                onChange={SearchChange} /><button  onClick={SearchSubmit} > search</button>
            </div>
           
            <HomeIcon onClick={gotoHome} fontSize="large" />
            {/* <button>cart</button> */}
                <AccountCircleIcon onClick={()=>setdraweropen(true)} fontSize="large" />
            <Drawer anchor="right" open={draweropen} onClose={()=>setdraweropen(false)}>
                <Box p={3} width="350px" textAlign="center">
                    <Typography variant="h5">
                        Profile
                    </Typography>
                </Box>
            </Drawer>
            <Badge badgeContent={3} color="primary">
                <ShoppingCartIcon  fontSize="large"/>
            </Badge>
            <LogoutIcon onClick={Logout} titleAccess="Logout" fontSize="large" />
            
        </div>
        
        </div>
    )
}

export default Header