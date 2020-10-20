import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializedLoginFrameWork = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

}

export const handleGoogleSignIn = () => {
const googleProvider = new firebase.auth.GoogleAuthProvider();

   return firebase.auth().signInWithPopup(googleProvider)
    .then(result => {
      const {displayName, photoURL, email} = result.user;
     const signedInUser = {
       isSignedIn : true,
       name: displayName,
       email: email,
       photo: photoURL, 
       success: true
     }
     return signedInUser;
      console.log(displayName, photoURL, email);
    })
    .catch(error => {
      console.log(error);
      console.log(error.message);
    })  
  }

  export const handleFbSignIn = () => {
    const fbProvider =  new firebase.auth.FacebookAuthProvider (); 

   return firebase.auth().signInWithPopup ( fbProvider )
    .then ( function ( result ) 
    { // This gives you a Facebook Access Token. You can use it to access the Facebook API. 
      var token = result.credential.accessToken ; 
      // The signed-in user info. 
      var user = result.user ;
      user.success = true ;
      return user ;
       // ... 
    //    console.log('fb user after sign in',user );
      })
      .catch ( function ( error ) {
         // handle errors here. 
  
  var errorCode = error.code ; 
  var errorMessage = error.message ;
   // The email of the user's account used. 
   var email = error.email ; 
   // The firebase.auth.AuthCredential type that was used. 
   var credential = error.credential ;
    // ... 
    console.log(errorCode, errorMessage);
  });
  }

  export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(result => {
      const signedOutUser = {
        isSignedIn: false,
        firstName: '',
        lastName: '',
        name: '',
        email: '',
        photo: '',
        success: false, 
      }
      return signedOutUser;
    })
    .catch(error => {
// an error happened
    })
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword (email ,password )
    .then(res => {
    //  console.log(res);
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    updateUserName(name);
    verifyEmail();
    return newUserInfo;
    })
    .catch ( error =>
    { // Handle Errors here.
  const newUserInfo = {};
  newUserInfo.error= error.message;
  newUserInfo.success = false;
  return newUserInfo;
 
      //  var errorCode = error.code ; 
      //  var errorMessage = error.message ; // ...
      //  console.log(errorCode,errorMessage);
       }); 
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword (email , password )
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
     return newUserInfo;
    //   console.log('sign in user info', res.user);
    }) 
    . catch ( error => { 
      const newUserInfo = {};
      newUserInfo.error= error.message;
      newUserInfo.success = false;
      return newUserInfo;
      }); 
  }
  
  

  const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function() {
    // Update successful.
    console.log('user name updated successfully');
  }).catch(function(error) {
    // An error happened.
    console.log('user name updated error');

    });
  }

  const verifyEmail = () => {
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
     
  }


 export const resetPassword = email => {
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
     
  }
