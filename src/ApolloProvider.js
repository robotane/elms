import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React from 'react';
import App from './App';
import { MediaContextProvider } from './util/Media';

const httpLink = createHttpLink({
    uri: 'http://localhost:5000',
});

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default (
    <ApolloProvider client={client}>
        <MediaContextProvider>
            <App />
        </MediaContextProvider>
    </ApolloProvider>
);
