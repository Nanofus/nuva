import { API_PATH } from "$lib/config";
import type { AuthData } from "$lib/util/types";

export const handleLogin = async (username: string, password: string): Promise<AuthData> => {
  const response = await (
    await fetch(API_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        mutation LoginUser {
            login(input: {
						    clientMutationId: "LoginUser"
						    username: "${username}"
						    password: "${password}"
				    }) {
					      authToken
					      refreshToken
					      user {
						        name
						        username
					      }
            }
        }`,
      }),
    })
  ).json();
  if (response.data.login) {
    return {
      displayName: response.data.login.user.name,
      username: response.data.login.user.username,
      authToken: response.data.login.authToken,
      refreshToken: response.data.login.refreshToken,
    };
  }
  return null;
};
