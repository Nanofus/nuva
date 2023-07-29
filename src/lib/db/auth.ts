import type { AuthInfo } from "$lib/util/types";
import { LOCALSTORAGE_AUTH_KEY } from "$lib/config";
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

export const login = async (username: string, password: string) => {
	const loginResult = await fetch("/api/auth", {
		method: "POST",
		body: JSON.stringify({ username, password }),
	});
	const authInfo = await loginResult.json();
	if (!loginResult.ok || !authInfo) {
		toast.push(t.toasts.loginFailed, toastSettings.error);
		return;
	}
	localStorage.setItem("userData", JSON.stringify(authInfo));
	loginInfo.set(authInfo);
	toast.push(`${t.toasts.welcome}, ${authInfo.displayName}!`, toastSettings.success);
};
