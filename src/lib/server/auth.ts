import type { AuthData } from "$lib/util/types";
import { globalConfig } from "$lib/util/config";

export const login = async (username: string, password: string): Promise<AuthData> => {
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

const isAuthTokenValid = async (authToken: string): Promise<boolean> => {
  const response = await (
    await fetch(globalConfig.graphqlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        query: `
                query CheckAuthenticated {
                  generalSettings {
                    email
                  }
                }
                `,
      }),
    })
  ).json();
  return !!response.errors;
};

export const authenticated = async (request: Request): Promise<boolean> => {
  const authToken = request.headers.get("Authorization")?.split(" ")[1];
  if (!authToken) return false;
  return await isAuthTokenValid(authToken);
};
