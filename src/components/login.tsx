import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import toast from "react-hot-toast";

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

const Login = ({ setLoading, onLogin, loggedIn }) => {
  const [login, { error, reset }] = useMutation(LOGIN, {
    onCompleted({ login }) {
      setLoading(false);
      if (login) {
        onLogin({ authToken: login.refreshToken, userName: login.user.name });
      }
    },
    onError(error) {
      setLoading(false);
      if (error.message == "incorrect_password") {
        toast.error("Väärä salasana.");
      } else if (error.message == "invalid_username") {
        toast.error("Kelvoton käyttäjätunnus.");
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
        {!loggedIn && [
          <input
            type="text"
            key="username"
            name="username"
            value={username}
            placeholder="Käyttäjätunnus"
            onChange={e => setUsername(e.target.value)}
          />,
          <input
            type="password"
            key="password"
            name="password"
            value={password}
            placeholder="Salasana"
            onChange={e => setPassword(e.target.value)}
          />,
          <button
            key="button"
            onClick={() => {
              if (!username || !password) {
                if (!username) toast.error("Käyttäjätunnus tyhjä.")
                if (!password) toast.error("Salasana tyhjä.")
                return;
              }
              setLoading(true);
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

export default Login;
