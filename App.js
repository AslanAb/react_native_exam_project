import Navigation from './src/navigation';
import React from 'react';
//import { AppRegistry } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import apolloClientSetup from './src/Services/api/apollo'
// Initialize Apollo Client


const App = () => (
  <ApolloProvider client={apolloClientSetup()}>
    <Navigation />
  </ApolloProvider>
);

export default App