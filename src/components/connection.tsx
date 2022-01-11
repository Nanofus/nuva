import React from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { toast } from "react-hot-toast";
import { isBrowser } from "../util";

const httpLink = createHttpLink({
  uri: "https://klaanon.fi/wp/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("authToken");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const fetchUserInfo = () => {
  return {
    userInfo: {
      userName: isBrowser ? localStorage.getItem("userId") : undefined,
      authToken: isBrowser ? localStorage.getItem("authToken") : undefined
    }
  };
}

export const handleLogin = (authToken, userName, userEmail) => {
  client.clearStore();
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("userId", userName);
  localStorage.setItem("userEmail", userEmail);
  client.link = authLink.concat(httpLink);
  toast.success('Kirjautuminen onnistui!');
}

export const handleLogout = () => {
  client.clearStore();
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");
  client.link = authLink.concat(httpLink);
  toast.success('Kirjauduit ulos.');
}

export default class Connection extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ApolloProvider client={client}>
        {this.props.children}
      </ApolloProvider>
    )
  };
}