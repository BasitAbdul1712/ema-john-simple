import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUer, setLoggedInUser] = useContext(UserContext)
    return (
        <Route
        {...rest}
        render={({ location }) =>
          loggedInUer.email ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
};

export default PrivateRoute;