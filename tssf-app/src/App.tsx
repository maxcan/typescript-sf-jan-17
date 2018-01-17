import * as React from 'react';
import './App.css';

// import gql from "graphql-tag";
// import { graphql } from "react-apollo";

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloProvider from 'react-apollo/ApolloProvider';
import AuthorList from './components/author-list/AuthorList';
import endpoint from './gen/endpoint';

const client = new ApolloClient({
  link: new HttpLink({uri: endpoint}),
  cache: new InMemoryCache()
});

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <AuthorList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
