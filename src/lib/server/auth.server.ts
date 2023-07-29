import { API_PATH } from "$lib/config";
import { toast } from "@zerodevx/svelte-toast";
import { t } from "$lib/translations";
import { toastSettings } from "$lib/util/util";
import type { AuthInfo } from "$lib/util/types";

export const handleLogin = async (
  username: string,
  password: string,
): Promise<AuthInfo | null> => {
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
