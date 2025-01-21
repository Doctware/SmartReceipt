import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ component: Component, isAuthenticated, ...props }) => (
    isAuthenticated ? (
        <Component {...props} />
    ) : (
        <Navigate to="/loginpage" replace />
    )
);

PrivateRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;