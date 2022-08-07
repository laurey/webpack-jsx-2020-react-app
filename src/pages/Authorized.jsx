import React from 'react';
import { Redirect } from 'react-router-dom';
import Exception403 from './Exception/403';
// import pathToRegexp from "path-to-regexp";
// import Authorized from "../utils/Authorized";
// import Exception from "../components/Exception";
import { getAuthority } from '../utils/authority';
import RenderAuthorized from '../components/Authorized';

// function AuthComponent({ children, location, routerData }) {
//   const auth = getAuthority();
//   const isLogin = auth && auth[0] !== "guest";
//   const getRouteAuthority = (path, routeData) => {
//     let authorities;
//     routeData.forEach((route) => {
//       // match prefix
//       if (pathToRegexp(`${route.path}(.*)`).test(path)) {
//         authorities = route.authority || authorities;

//         // get children authority recursively
//         if (route.routes) {
//           authorities = getRouteAuthority(path, route.routes) || authorities;
//         }
//       }
//     });
//     return authorities;
//   };
//   return (
//     <Authorized
//       authority={getRouteAuthority(location.pathname, routerData)}
//       noMatch={isLogin ? <Exception type="403" /> : <Redirect to="/" />}
//     >
//       {children}
//     </Authorized>
//   );
// }
const Authority = getAuthority();
const Authorized = RenderAuthorized(Authority);

const AuthorizedWrapper = ({ children, ...rest }) => (
    <Authorized authority={children.props.route.authority} noMatch={<Exception403 {...rest} />}>
        {children}
    </Authorized>
);

export default AuthorizedWrapper;
