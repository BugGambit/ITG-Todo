import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getApiKeyFromLocalStorage } from "./hooks/useApiKey";

const httpLink = createHttpLink({
  uri:
    "https://itg.cognite.ai/api/projects/ad04cd9f3-6ffb-4550-adc9-9ba198b31cb1/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const { apiKey } = useApiKey();
  const apiKey = getApiKeyFromLocalStorage();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: apiKey ? `Bearer ${apiKey}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
