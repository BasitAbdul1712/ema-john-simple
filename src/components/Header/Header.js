import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    return (
       
        <div className = "header">
            <img src= {logo} alt=""/>
            <nav>  
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/orders">Manage History</Link>
                <Link className="userName">{loggedInUser.name}</Link>
                <button onClick = {() => setLoggedInUser({})}>Sign out</button>
            </nav>
        </div>
    )
}; 

export default Header;