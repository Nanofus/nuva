import type { AuthInfo } from "$lib/util/types";
import { API_PATH, LOCALSTORAGE_AUTH_KEY } from "$lib/config";
import { browser } from "$app/environment";
import { loginInfo } from "$lib/util/stores";
import { toast } from "@zerodevx/svelte-toast";
import { t } from "$lib/translations";
import { toastSettings } from "$lib/util/util";

export const getAuthInfo = (): AuthInfo | null => {
	if (localStorage !== undefined) {
		return localStorage.getItem(LOCALSTORAGE_AUTH_KEY)
			? JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_KEY)!)
			: null;
	}
	return null;
};

export const isLoggedIn = (): boolean => {
	if (!browser) {
		return false;
	}

	return Boolean(getAuthInfo());
};

export const logout = (): void => {
	loginInfo.set(null);
	localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
	toast.push(t.toasts.loggedOut, toastSettings.success);
};

export const login = async (
	fetch: Function,
	username: string,
	password: string,
): Promise<boolean> => {
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
	if (response.errors?.length > 0) {
		toast.push(t.toasts.loginFailed, toastSettings.error);
	}

	if (response.data.login) {
		const loginData: AuthInfo = {
			displayName: response.data.login.user.name,
			username: response.data.login.user.username,
			authToken: response.data.login.authToken,
			refreshToken: response.data.login.refreshToken,
		};
		localStorage.setItem("auth", JSON.stringify(loginData));
		loginInfo.set(loginData);
		toast.push(`${t.toasts.welcome}, ${loginData.displayName}!`, toastSettings.success);
		return true;
	}

	return false;
};
