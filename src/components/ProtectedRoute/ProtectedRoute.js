import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, OpenSignInPopup, loggedIn, path, ...props }) => {
  return (
    <Route path={props.path}>
      {
        () => loggedIn ? <Component {...props} /> : <Redirect to="/" setSignInPopupOpen={OpenSignInPopup()}/>
      }
    </Route>
  )
}