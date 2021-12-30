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
  //  useQuery,
  useMutation,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import React, { useState, useEffect } from "react";

import { Toaster, toast } from "react-hot-toast";
import ReactTooltip from "react-tooltip";

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
      <Wrapper element={element} />
    </ApolloProvider>
  );
};

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      helpOpen: false,
    }
    this.openHelpFunc = this.openHelp.bind(this);
    this.closeHelpFunc = this.closeHelp.bind(this);
  }

  openHelp() {
    this.setState({ helpOpen: true });
  }
  closeHelp() {
    this.setState({ helpOpen: false });
    ReactTooltip.hide();
  }

  render() {
    return (
      <div>
        <Toaster />
        <ReactTooltip place="bottom" effect="solid" className="tooltip" />
        <Menu onHelpOpen={this.openHelpFunc} />
        {this.state.helpOpen && <Help onClose={this.closeHelpFunc} />}
        {this.props.element}
      </div >
    )
  };
}

/*const VIEWER = gql`
  query GetViewer {
    viewer {
      firstName
    }
  }
`;*/

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
    this.state = {
      ...fetchUserInfo(),
      loggedIn: !!localStorage.getItem("authToken"),
      menuOpen: false,
    };
    this.loginFunc = this.login.bind(this);
    this.toggleMenuFunc = this.toggleMenu.bind(this);
    this.setLoadingFunc = this.setLoading.bind(this);
  }

  componentDidUpdate() {
    ReactTooltip.rebuild();
  }

  login(userInfo) {
    this.setState({ loggedIn: true });
    handleLogin(userInfo.authToken, userInfo.userName);
    this.setState(fetchUserInfo());
  }
  logout() {
    handleLogout();
    this.setState({ loggedIn: false });
    this.setState(fetchUserInfo());
  }
  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }
  setLoading(isLoading) {
    this.setState({ loading: isLoading });
  }

  render() {
    return (
      <div className={"menu window " + (this.state.menuOpen ? "open" : "closed")}>
        <div className="wrapper">
          <div className="iconRow">
            <i className="icon left fas fa-bars" onClick={this.toggleMenuFunc}></i>
            {this.state.loggedIn && <i className="icon fas fa-sign-out-alt" data-tip="Kirjaudu ulos" onClick={() => this.logout()}></i>}
            <i className="icon fas fa-question-circle" data-tip="Tietoa" onClick={() => this.props.onHelpOpen()}></i>
          </div>
          <hr className="separator" />
          {this.state.loading ?
            <div className="loadingSpinner"><div className="lds-dual-ring"></div></div>
            :
            <div className="menuContent">
              <ViewerInformation userInfo={this.state.userInfo} />
              <Login loggedIn={this.state.loggedIn} onLogin={this.loginFunc} setLoading={this.setLoadingFunc} />
            </div>
          }
        </div>
      </div>
    );
  }
}

function fetchUserInfo() {
  return { userInfo: { userName: localStorage.getItem("userId"), authToken: localStorage.getItem("authToken") } };
}

function handleLogin(authToken, userName) {
  client.clearStore();
  localStorage.setItem("authToken", authToken);
  localStorage.setItem("userId", userName);
  client.link = authLink.concat(httpLink);
  toast.success('Kirjautuminen onnistui!');
}

function handleLogout() {
  client.clearStore();
  localStorage.removeItem("authToken");
  localStorage.removeItem("userId");
  client.link = authLink.concat(httpLink);
  toast.success('Kirjauduit ulos.');
}

function Login(props) {
  const [login, { error, reset }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      props.setLoading(false);
      if (login) {
        setUsername("");
        setPassword("");
        props.onLogin({ authToken: login.refreshToken, userName: login.user.name });
      }
    },
    onError(error) {
      props.setLoading(false);
      if (error.message == "incorrect_password") {
        toast.error("Väärä salasana.");
        setPassword("");
      } else if (error.message == "invalid_username") {
        toast.error("Kelvoton käyttäjätunnus.");
        setUsername("");
        setPassword("");
      } else {
        toast.error("Kirjautuminen epäonnistui.");
      }
    }
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
        {!props.loggedIn && [
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Käyttäjätunnus"
            onChange={e => setUsername(e.target.value)}
          />,
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Salasana"
            onChange={e => setPassword(e.target.value)}
          />,
          <button
            onClick={() => {
              if (!username || !password) {
                if (!username) toast.error("Käyttäjätunnus tyhjä.")
                if (!password) toast.error("Salasana tyhjä.")
                return;
              }
              props.setLoading(true);
              login({
                variables: {
                  username: username,
                  password: password,
                },
              });
            }}
          >
            Kirjaudu sisään
          </button>,
        ]}
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

  return userInfo.userName ? <h6>{userInfo.userName}</h6> : null;
}

function Help(props) {
  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);

  return (
    <div className="window helpWrapper">
      <div className="iconRow">
        <i className="icon fas fa-times" data-tip="Sulje" onClick={() => props.onClose(false)}></i>
      </div>
      <hr className="separator" />
      <div className="helpContent">
        <h2>Uusi Klaanon-sivu</h2>
        <span>Kepe teki vähän juttuja. Seuraavassa puuttuvat featuret.</span>
        <ul className="list">
          <li>Kommentointi</li>
          <li>Kirjanmerkit</li>
          <li>Teemat</li>
          <li>Esimääritellyt tyylit</li>
        </ul>
        <span>Sivu tehty <a href="https://www.gatsbyjs.com/" target="_blank">Gatsbylla</a> ja <a href="https://reactjs.org/" target="_blank">Reactilla</a>.</span>
      </div>
    </div>
  );
}
