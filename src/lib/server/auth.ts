import type { AuthData } from "$lib/util/types";
import { globalConfig } from "$lib/util/config";
import { isAuthTokenValid } from "$lib/server/database";

export const authenticated = async (request: Request): Promise<boolean> => {
  const authToken = request.headers.get("Authorization")?.split(" ")[1];
  if (!authToken) return false;
  return await isAuthTokenValid(authToken);
};

export const handleLogin = async (username: string, password: string): Promise<AuthData> => {
  const response = await (
    await fetch(globalConfig.graphqlApi, {
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
