import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, isAuthenticated, ...rest }){
  return (
    <Route {...rest} render={(props) =>  {
      const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }} />
  )
}

export default ProtectedRoute;