// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";

// normalize CSS across browsers
import "./src/css/normalize.css";

// custom CSS styles
import "./src/css/style.scss";

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { toast } from "react-hot-toast";

import Wrapper from "./src/components/wrapper";

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
  console.log("new pathname", location.pathname);
  console.log("old pathname", prevLocation ? prevLocation.pathname : null);
};

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
  return { userInfo: { userName: localStorage.getItem("userId"), authToken: localStorage.getItem("authToken") } };
}

export const handleLogin = (authToken, userName) => {
  client.clearStore();
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("userId", userName);
  client.link = authLink.concat(httpLink);
  toast.success('Kirjautuminen onnistui!');
}

export const handleLogout = () => {
  client.clearStore();
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  client.link = authLink.concat(httpLink);
  toast.success('Kirjauduit ulos.');
}

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return (
    <ApolloProvider client={client}>
      <Wrapper element={element} />
    </ApolloProvider>
  );
};
