
import { 
    ApolloClient,
    InMemoryCache,
    //split,
    ApolloLink,
    //HttpLink,
    from,
  } from '@apollo/client';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { createUploadLink } from 'apollo-upload-client';
  
  // import { getMainDefinition } from '@apollo/client/utilities';
  // import { WebSocketLink } from '@apollo/client/link/ws';
  
  import config from '../../Config';
  
  const apolloClientSetup = () => {
      const link = from([
        createUploadLink({ uri: config.graphqlURI }),
      ]);

      const authLink = new ApolloLink(async (operation, forward) => {
        const token = await AsyncStorage.getItem(config.TOKEN);
  
        operation.setContext({
          testdata: 'HELLO',
          headers: {
            authorization: token ? `${token}` : 'none'
          }
        });
        return forward(operation);
      });
  
      const client = new ApolloClient({
        link: authLink.concat(link),
        cache: new InMemoryCache(),
        clientState: {
          test: 'HELLO'
        }
      });
  
    return client;
  }
  
  export default apolloClientSetup;
  
  