import { auth } from "$lib/util/stores";
import { toast } from "@zerodevx/svelte-toast";
import { t } from "$lib/util/translations";
import { toastSettings } from "$lib/util/util";
import { localConfig } from "$lib/util/config";

export const loadLoginStatus = () => {
  if (localStorage !== undefined) {
    if (localStorage.getItem(localConfig.localStorageAuthKey))
      auth.set(JSON.parse(localStorage.getItem(localConfig.localStorageAuthKey)!));
  }
  auth.set(null);
};

export const logout = (): void => {
  auth.set(null);
  localStorage.removeItem(localConfig.localStorageAuthKey);
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
  localStorage.setItem(localConfig.localStorageAuthKey, JSON.stringify(authInfo));
  auth.set(authInfo);
  toast.push(`${t.toasts.welcome} ${authInfo.displayName}!`, toastSettings.success);
};
