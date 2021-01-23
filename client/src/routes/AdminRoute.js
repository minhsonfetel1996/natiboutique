import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { getCurrentUser } from '../store/AuthReducer';

const AdminRoute = ({ component: Component, ...rest }) => {
    return rest.currentUser && rest.currentUser.role === 'ADMIN' ? (
        <Route
            {...rest}
            render={(props) => <Component {...props} />}
        />
    ) : <Redirect to="/login" />;
};

const mapStateToProps = (state) => {
    return { currentUser: getCurrentUser(state) };
};

export default connect(mapStateToProps)(AdminRoute);
