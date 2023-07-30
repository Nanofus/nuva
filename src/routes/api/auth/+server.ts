import { handleLogin } from "$lib/server/auth.server";
import { error, json } from "@sveltejs/kit";
import { t } from "$lib/translations";

export const POST = async ({ request }: { request: any }) => {
	const { username, password } = await request.json();
	const loginResult = await handleLogin(username, password);
	if (!loginResult) throw error(401, t.errors.e401);
	return json(loginResult);
}
