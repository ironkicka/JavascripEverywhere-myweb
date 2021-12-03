// import React and our routing dependencies
import { useQuery, gql } from '@apollo/client';
import {BrowserRouter as Router, Route, Redirect, Switch, withRouter} from 'react-router-dom';

// import our shared layout component
import Layout from '../components/Layout';

// import our routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from "./note";
import SignUp from "./signUp";
import SignIn from "./signIn";
import React, {Component} from "react";
import NewNote from "./new";
import {IS_LOGGED_IN} from "../gql/query";
import EditNote from "./edit";
// import Note from './note';
// import SignUp from './signup';
// import SignIn from './signin';
// import NewNote from './new';
// import EditNote from './edit';

// define our routes
const Pages = () => {
    return (
        <Router>
            <Layout>
                <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/mynotes" component={MyNotes} />
                <PrivateRoute path="/favorites" component={Favorites} />
                <Route path="/note/:id" component={NotePage} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <PrivateRoute path="/new" component={NewNote} />
                <PrivateRoute path="/edit/:id" component={EditNote} />
                </Switch>
            </Layout>
        </Router>
    );
};

const PrivateRouteBase = ({Component,...rest}:any) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;
    if(!data.isLoggedIn){
        rest.history.push('/signIn');
    }
    return (
        <Route
            {...rest}
            render={props =>
                    <Component {...props}/>
            }
        />
    );
};

const PrivateRoute =withRouter(PrivateRouteBase);


export default Pages;
