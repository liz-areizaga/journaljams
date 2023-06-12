import { createContext, useState } from "react";
import { App, Credentials } from "realm-web";
import { APP_ID } from "../realm/constants";
 
// Creating a Realm App Instance
const app = new App(APP_ID);
 
// Creating a user context to manage and access all the user related functions
// across different components and pages.
export const UserContext = createContext();
 
export const UserProvider = ({ children }) => {
 const [user, setUser] = useState(null);

//send Email to user to reset password
const emailSendPasswordReset = async (email) => {
  try {
    await app.emailPasswordAuth.sendResetPasswordEmail(email);
    console.log("Password reset email sent successfully");
  } catch (error) {
    throw error;
  }
};

//changePassword
const emailPasswordReset = async (token, tokenId, newPassword) => {
  try {
    await app.emailPasswordAuth.resetPassword({
      password: newPassword, 
      token, 
      tokenId
    });
    console.log("Password reset successfully");
  } catch (error) {
    throw error;
  }
};

//send Email to user to confirm email
const emailResendConfirm = async (email) => {
  try {
    await app.emailPasswordAuth.resendConfirmationEmail({email});
    console.log("Password reset email sent successfully");
  } catch (error) {
    throw error;
  }
};

//confirm user
const emailConfirmUser = async (token, tokenId) => {
  try {
    await app.emailPasswordAuth.confirmUser({
      token, 
      tokenId
    });    
    console.log("user confirmed successfully");
  } catch (error) {
    throw error;
  }
};

 // Function to log in user into our App Service app using their email & password
 const emailPasswordLogin = async (email, password) => {
    const credentials = Credentials.emailPassword(email, password);
    const authenticatedUser = await app.logIn(credentials);
    fetch(`/api/newUser/${email}`, {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setUser(authenticatedUser);
    return authenticatedUser;
 };
 
 // Function to sign up user into our App Service app using their email & password
 const emailPasswordSignup = async (email, password) => {
   try {
     await app.emailPasswordAuth.registerUser(email, password);
     // Since we are automatically confirming our users, we are going to log in
     // the user using the same credentials once the signup is complete.
     return emailPasswordLogin(email, password);
   } catch (error) {
     throw error;
   }
 };
 
 // Function to fetch the user (if the user is already logged in) from local storage
 const fetchUser = async () => {
   if (!app.currentUser) return false;   
   try {
     await app.currentUser.refreshCustomData();
     // Now, if we have a user, we are setting it to our user context
     // so that we can use it in our app across different components.
     setUser(app.currentUser);
     return app.currentUser;
   } catch (error) {
     throw error;
   }
 }
 
 // Function to logout user from our App Services app
 const logOutUser = async () => {
   if (!app.currentUser) return false;
   try {
     await app.currentUser.logOut();
     // Setting the user to null once loggedOut.
     setUser(null);
     return true;
   } catch (error) {
     throw error
   }
 }

 return <UserContext.Provider value={{ user, setUser, fetchUser, emailPasswordLogin, emailPasswordSignup, logOutUser, emailPasswordReset, emailSendPasswordReset, emailResendConfirm, emailConfirmUser}}>
   {children}
 </UserContext.Provider>;
}