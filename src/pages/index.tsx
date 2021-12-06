// import React and our routing dependencies
import { useQuery, gql } from '@apollo/client';
import {
    RouteComponentProps,
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    withRouter,
    RouteProps
} from 'react-router-dom';

// import our shared layout component
import Layout from '../components/Layout';

// import our routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import NotePage from "./note";
import SignUp from "./signUp";
import SignIn from "./signIn";
import React from "react";
import NewNote from "./new";
import {IS_LOGGED_IN} from "../gql/query";
import EditNote from "./edit";

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

const PrivateRoute = withRouter((props:RouteComponentProps & RouteProps) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // if the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message
    if (error) return <p>Error!</p>;
    if(!data.isLoggedIn){
        props.history.push('/signIn');
    }
    return (
        <Route
            {...props}
        />
    );
});


export default Pages;
