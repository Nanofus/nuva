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

const Login = props => {
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

export default Login;
