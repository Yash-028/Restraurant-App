import {Route} from 'react-router-dom'
import React,{useContext,useEffect,useState} from 'react'
import Header from './components/Header.js'
import Home from './components/Home.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Card from './components/Card.js'
import './App.css'
import ItemDetail from './components/itemDetails.js'
import Checkout from './components/Checkout.js'
import Login from './components/Login.js'
import Signup from './components/Signup.js'
import Admin from './components/Admin.js'
import BookTable from './components/BookTable.js'
import Menu from './components/Menu.js'
import User from './components/User.js'
import Footer from './components/footer.js'
import ErrorPage from './components/ErrorPage.js'
import Logout from './components/Logout.js'
import {Button} from 'react-bootstrap'
import {NavLink,Switch} from 'react-router-dom'
import {UserContext} from './context/userDetailContext.js'
import {LoginStateContext} from './context/loginStateContext.js'



function App() {
	
  return(<>
  <Header/>
  <div className="app-div">
  <Switch>
  <Route exact path="/">
  <Home/>
  </Route>
  <Route path="/login">
  <Login/>
  </Route>
  <Route path="/signup">
  <Signup/>
  </Route>
  <Route path="/itemdetails">
  <ItemDetail/>
  </Route>
  <Route path="/checkout">
  <Checkout/>
  </Route>
  <Route path="/booktable">
  <BookTable/>
  </Route>
  <Route path="/menu">
  <Menu/>
  </Route>
  <Route path="/admin">
  <Admin/>
  </Route>
  <Route path="/userinfo">
  <User/>
  </Route>
  <Route path="/logout">
  <Logout/>
  </Route>
  <Route>
  <ErrorPage/>
  </Route>
 </Switch>
 </div>
 <Footer/>
  </>);

}

export default App;
