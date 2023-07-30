import { LOCALSTORAGE_AUTH_KEY } from "$lib/config";
import { auth } from "$lib/util/stores";
import { toast } from "@zerodevx/svelte-toast";
import { t } from "$lib/translations";
import { toastSettings } from "$lib/util/util";

export const loadAuthFromLocalStorage = () => {
  if (localStorage !== undefined) {
    if (localStorage.getItem(LOCALSTORAGE_AUTH_KEY))
      auth.set(JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH_KEY)!));
  }
  auth.set(null);
};

export const logout = (): void => {
  auth.set(null);
  localStorage.removeItem(LOCALSTORAGE_AUTH_KEY);
  toast.push(t.toasts.loggedOut, toastSettings.success);
};

export const login = async (username: string, password: string) => {
  const loginResult = await fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  if (!loginResult.ok) {
    toast.push(t.toasts.loginFailed, toastSettings.error);
    return;
  }
  const authInfo = await loginResult.json();
  localStorage.setItem(LOCALSTORAGE_AUTH_KEY, JSON.stringify(authInfo));
  auth.set(authInfo);
  toast.push(`${t.toasts.welcome}, ${authInfo.displayName}!`, toastSettings.success);
};
