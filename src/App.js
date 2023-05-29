import React from 'react';
import Register from './component/register/register';
import Login from './component/register/login';
import './App.css';
import { useState } from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Home from './component/Dashboard/home/home';
import ProtectedRoute from "../src/component/auth"
import Singleitem from './component/Dashboard/singleitem';
import Allitems from './component/Dashboard/allitems';
import Search from './component/Dashboard/headerFooter/search';
import Cart from './component/Dashboard/cart';
import OrderCheckout from './component/Dashboard/orderCheckout';
import OrderSuccess from './component/Dashboard/ordersuccess';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  // };
  return (
   <div >
   <BrowserRouter>
   <Switch>
   <Route exact path='/' ><Register /></Route>
   <Route exact path='/login'><Login onLogin={handleLogin} /></Route>
   <ProtectedRoute exact path="/home" component={()=><Home  />} isAuthenticated={isAuthenticated} />
   <Route path="/singleitem" component={()=><Singleitem  />} ></Route>
   <Route path="/allitem" component={()=><Allitems  />} ></Route>
   <Route path="/search" component={()=><Search  />}></Route>
   <Route path="/cart" component={()=><Cart  />} ></Route>
   <Route path="/orderCheckout" component={()=><OrderCheckout  />} ></Route>
   <Route path="/orderSuccessfully" render={(props) => <OrderSuccess onLogin={handleLogin} {...props} />} />
   </Switch>
   </BrowserRouter>
   </div>
  );
}

export default App;
