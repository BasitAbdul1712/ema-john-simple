import React, { useContext, useState } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import {handleGoogleSignIn, initializedLoginFrameWork, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword, resetPassword} from './LoginManager'



function Login() {
  const [newUser, setNewUSer] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    firstName: '',
    lastName: '',
    name: '',
    email: '',   
    photo: '',
    error : '',
    
  });
  initializedLoginFrameWork();

const [loggedInUser, setLoggedInUser] = useContext(UserContext);
const history = useHistory();
const location = useLocation();
const { from } = location.state || { from: { pathname: "/" } };
const googleSignIn = () => {
    handleGoogleSignIn()
    .then(response =>{
        handleResponse(response, true)
    })
}

const fbSignIn = () => {
    handleFbSignIn()
    .then(response =>{
        handleResponse(response, true)
    })

}
const signOut = () => {
    handleSignOut()
    .then(response =>{
        handleResponse(response, false)
    })
}

const handleResponse = (response, redirect) => {
    setUser(response);
    setLoggedInUser(response);
    if (redirect) {
        history.replace(from);
    } 
}
 
  const handleBlur = (event) => {
    let isFieldValid = true;
    // debugger;
    console.log(event.target.name, event.target.value);
    // console.log(event.target.value)
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);

    }
    if ( event.target.name === 'password') {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      const specialCharacters = /\W|_/g.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber && specialCharacters;
    }
    if (isFieldValid) {
      // [...cart, newItem]
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo)
    }
    
  }

  const handleSubmit = (event) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      // console.log('submitting') 
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>{
        handleResponse(res, true)
    })
    }
    if (!newUser && user.email && user.password){
     signInWithEmailAndPassword(user.email, user.password)
     .then(res =>{
        handleResponse(res, true)
    })
  }
  event.preventDefault();
  }

  

  return (
    <div style = {{textAlign: 'center'}} >
   {
       user.isSignedIn ?  <button onClick={signOut} >  Sign out </button> : 
       <button onClick={googleSignIn} > Sign in</button>
    }
    <br/>

    <button onClick = {fbSignIn}>Sign in using Facebook </button>
     {
       user.isSignedIn && <div>Welcome {user.name}
       <p>Your email: {user.email} </p>
       <img src={user.photo} alt=""/>
       </div>
     }

     <h1>Our own Authentication</h1>
     <input type="checkbox" onChange={()=> setNewUSer(!newUser) } name="newUSer" id=""/>
     <label htmlFor="newUser">New User Sign up</label>
     {/* <button onChange={()=> setNewUSer(!newUser) }>Create New account</button> */}
     {/* <p>First Name: {user.firstName}</p>
     <p>Last Name: {user.lastName}</p>
     <p>Name: {user.name}</p>
     <p>email: {user.email}</p>
     <p>password: {user.password}</p> */}
     
    <form onSubmit={handleSubmit} >
    
{    newUser && <input type="firstName" name="firstName" onBlur={handleBlur} placeholder = "Your First name" />
}      <br/>
{  newUser &&    <input type="lastName" name="lastName" onBlur={handleBlur} placeholder = "Your Last name" />
}      <br/>
{  newUser && <input type="name" name="name" onBlur={handleBlur} placeholder = "Your name" />
}     <br/>
      <input type="text" name = "email" onBlur={handleBlur} placeholder="Write your email address" required/>
      <br/>
      <input type="password" name="password" onBlur={handleBlur} id="" placeholder="Your password"  required />
      <br/>
      <input type="submit" value={newUser ? 'Sign up' : 'Sign in'}/>
   </form>
   <button onClick = {() => resetPassword(user.email)}>Forget or resetPassword</button>
    <p style ={{color: 'red'}} >{user.error}</p>
    {user.success && <p style ={{color: 'green'}} > User {newUser ? 'Created' :'Logged In' } successfully</p>
}
    </div>
  );
}

export default Login;
