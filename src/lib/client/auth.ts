import { auth } from '$lib/client/stores';
import { toast } from '@zerodevx/svelte-toast';
import { t } from '$lib/client/localization';
import { toastSettings } from '$lib/client/util';
import { clientConfig } from '$lib/client/config';

export const getLoginStatus = () => {
  if (localStorage !== undefined) {
    if (localStorage.getItem(clientConfig.localStorageAuthKey))
      auth.set(JSON.parse(localStorage.getItem(clientConfig.localStorageAuthKey)!));
  }
  auth.set(null);
};

export const logout = (): void => {
  auth.set(null);
  localStorage.removeItem(clientConfig.localStorageAuthKey);
  toast.push(t.toasts.loggedOut, toastSettings.success);
};

export const login = async (username: string, password: string) => {
  const loginResult = await fetch('/api/auth', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });
  if (!loginResult.ok) {
    toast.push(t.toasts.loginFailed, toastSettings.error);
    return;
  }
  const authInfo = await loginResult.json();
  localStorage.setItem(clientConfig.localStorageAuthKey, JSON.stringify(authInfo));
  auth.set(authInfo);
  toast.push(`${t.toasts.welcome} ${authInfo.displayName}!`, toastSettings.success);
};
