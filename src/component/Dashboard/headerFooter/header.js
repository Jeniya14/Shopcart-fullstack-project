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
import { Box, Drawer, Badge,IconButton,TextField, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import profile from "../../image/profile.jpg"
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';
function Header(props){
    let history=useHistory();
    const [search,setsearch]=useState("")
    const [open,setopen]=useState(false)
    let [draweropen,setdraweropen]=useState(false)
    const [Profiledetail,setprofiledetail]=useState({});
    const [totalQuantity, setTotalQuantity] = useState(props.count || 0);
    const [editMode, setEditMode] = useState(false);
      useEffect(() => {
        const user=JSON.parse (sessionStorage.getItem('user') );
        if (user) {
            axios.get(`http://localhost:5000/user/${user.email}`)
            .then(res => setprofiledetail(res.data))
            .catch(err => console.log(err));
        }
        setTotalQuantity(props.count || totalQuantity)
      }, []);
      useEffect(()=>{
        setTotalQuantity(props.count || 0);
      },[props.count])
      function handleSubmit() {
        axios.put(`http://localhost:5000/user/${Profiledetail.email}`, Profiledetail)
          .then(res => {
            console.log(res.data);
            if(res.data==="updated"){
              setopen(true)
            }
            setEditMode(false);
          })
          .catch(err => console.log(err));
      }
    function Logout(){
        history.push("/login")
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
 
      function handler(e){
        let copy={...Profiledetail}
        copy[e.target.name]=e.target.value
        setprofiledetail(copy)
    }
    useEffect(() => {
      async function fetchData() {
        const userEmail = JSON.parse(sessionStorage.getItem('user'));
        if (userEmail) {
          const response = await axios.get(`http://localhost:5000/cart/${userEmail.email}`);
          const cartItems = response.data.items 
          let total = 0 ;
          cartItems.forEach((item) => { 
            total += item.quantity;
          });
          setTotalQuantity(total);
        }
      }
      fetchData();
    }, [setTotalQuantity]);
    
    function cartpage(){
      history.push("/cart")
    }
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setopen(false);
    }
    const Alert = React.forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={1} ref={ref} variant="outlined" {...props} />;
    });
    return(
        <div style={{height:"100%"}}>
        <div className="header">
            <img src={mainlogo}></img>
            <div>
                <input type='text' value={search} className="search-input" placeholder="Search for products and more.."
                onChange={SearchChange}  /><button  onClick={SearchSubmit}> Search</button>
            </div>
              <HomeIcon onClick={gotoHome} fontSize="large" sx={{cursor:"pointer"}}/>
                <AccountCircleIcon onClick={()=>setdraweropen(true)} fontSize="large" sx={{cursor:"pointer"}} />

            <Drawer anchor="right" open={draweropen} onClose={()=>setdraweropen(false)}>
                <Box p={3} width="350px" textAlign="center">
                    <img src={profile} style={{height:"100px"}}></img>
                    <br/>
                    <div>
                        <span style={{fontSize:"20px",marginTop:"2px"}}>Profile</span>  <IconButton onClick={() => setEditMode(true)} ><EditIcon color="secondary" /></IconButton>
                    </div>
                    <Box component="form"  className="profile-form">
                   <div><TextField fullWidth variant="outlined" label="Name" 
                    defaultValue={editMode ? Profiledetail.name : Profiledetail.name}
                    onChange={handler}
                    color="secondary"
                    name="name" 
                    disabled={!editMode}/>
                    </div>
                   <div><TextField fullWidth variant="outlined" label="email" name="email" defaultValue={editMode ? Profiledetail.email : Profiledetail.email}
                    onChange={handler}
                    color="secondary"
                    disabled={!editMode}/>
                    </div>
                   <div><TextField fullWidth variant="outlined" label="Password" name="password" value={editMode ? Profiledetail.password : '********'}
                    onChange={handler}
                    color="secondary" 
                    disabled={!editMode} /></div>
                   <div><TextField fullWidth variant="outlined"  multiline  rows={3}   defaultValue={editMode ? Profiledetail.address : Profiledetail.address} onChange={handler } label="Address" color="secondary" disabled={!editMode} name="address"/></div>
                   <div><TextField fullWidth variant="outlined" label="Mobile number" defaultValue={editMode ? Profiledetail.mobileNumber : Profiledetail.mobileNumber} onChange={handler} disabled={!editMode} name="mobileNumber" /></div>
                   <Button color="success" variant="contained" onClick={handleSubmit}>Save</Button>
                   <Snackbar  autoHideDuration={3000} open={open} onClose={handleClose}  >
                     <Alert onClose={handleClose} severity="secondary" sx={{ width: '300px' ,backgroundColor:"rgb(237, 222, 240)"}}>
        Profile Updated successfully!
        </Alert>
                      </Snackbar>
                    </Box>
                </Box>
            </Drawer>
            
            <Badge badgeContent={totalQuantity} color="primary">
                <ShoppingCartIcon onClick={cartpage} fontSize="large"/>
            </Badge>
            <LogoutIcon onClick={Logout} titleAccess="Logout" fontSize="large" sx={{cursor:"pointer"}} />
            
        </div>
        
        </div>
    )
}

export default Header