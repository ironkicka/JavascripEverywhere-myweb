import React from 'react';
import ReactDOM from 'react-dom';
import {
    ApolloClient, ApolloLink,
    ApolloProvider,
    createHttpLink,
    InMemoryCache
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

// import global styles
import GlobalStyle from "./components/GlobalStyle";
import Pages from "./pages";
// import our routes
// import Pages from '/pages';

// configure our API URI & cache
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri }) as any;
const cache = new InMemoryCache();

// return the headers to the context
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});

// create the Apollo client
const client = new ApolloClient({
    link: (authLink.concat(httpLink) as any),
    cache,
    resolvers: {},
    connectToDevTools: true
});

// check for a local token
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};

// write the cache data on initial load
cache.writeData({ data });
// write the cache data after cache is reset
client.onResetStore(async () => cache.writeData({ data }));

const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle/>
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
