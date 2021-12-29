// custom typefaces
import "typeface-montserrat";
import "typeface-merriweather";

// normalize CSS across browsers
import "./src/css/normalize.css";

// custom CSS styles
import "./src/css/style.scss";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import React, { useState, setState } from "react";

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

// Wraps every page in a component
export const wrapPageElement = ({ element, props }) => {
  return (
    <ApolloProvider client={client}>
      <Menu />
      {element}
    </ApolloProvider>
  );
};

const VIEWER = gql`
  query GetViewer {
    viewer {
      firstName
    }
  }
`;

const LOGIN = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(
      input: {
        clientMutationId: "aaaaa"
        username: $username
        password: $password
      }
    ) {
      authToken
      refreshToken
      user {
        id
        name
      }
    }
  }
`;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = fetchUserInfo();
    this.loginFunc = this.login.bind(this);
    this.logoutFunc = this.logout.bind(this);
  }

  login(userInfo) {
    handleLogin(userInfo.authToken, userInfo.userName);
    this.setState(fetchUserInfo());
  }
  logout() {
    handleLogout();
    this.setState(fetchUserInfo());
  }

  render() {
    return (
      <div className="menu">
        <Login onLogin={this.loginFunc} onLogout={this.logoutFunc} />
        <ViewerInformation userInfo={this.state.userInfo} />
      </div>
    );
  }
}

function fetchUserInfo() {
  return { userInfo: { userName: localStorage.getItem("userId"), authToken: localStorage.getItem("authToken") } };
}

function LoggedIn() {
  return !!localStorage.getItem("authToken");
}

function handleLogin(authToken, userName) {
  client.clearStore();
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("userId", userName);
  client.link = authLink.concat(httpLink);
}

function handleLogout() {
  client.clearStore();
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  client.link = authLink.concat(httpLink);
}

function Login(props) {
  const [login, { error, reset }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      console.log(login);
      if (login) {
        props.onLogin({ authToken: login.refreshToken, userName: login.user.name });
      }
    },
  });
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
        {!LoggedIn() && [
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />,
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />,
          <button
            onClick={() => {
              login({
                variables: {
                  username: username,
                  password: password,
                },
              });
            }}
          >
            Login
          </button>,
        ]}
        {LoggedIn() && <button onClick={() => props.onLogout()}>Log Out</button>}
      </div>
      {error && <button onClick={() => reset()}>{error.message}</button>}
    </>
  );
}

function ViewerInformation(props) {
  /*const { loading, error, data } = useQuery(VIEWER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div key={data.viewer}>
      <p>Username: {data.viewer?.firstName}</p>
    </div>
  );*/

  const { userInfo } = props;

  return <span>{userInfo.userName}</span>
}
