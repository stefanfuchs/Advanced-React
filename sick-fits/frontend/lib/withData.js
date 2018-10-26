import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { endpoint } from '../config';
import https from 'https'

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
          agent: new https.Agent({ rejectUnauthorized: false })
        },
        headers,
      });
    },
  });
}

export default withApollo(createClient);
