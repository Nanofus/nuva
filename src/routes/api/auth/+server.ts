import { handleLogin } from "$lib/server/auth.server";
import { error, json } from "@sveltejs/kit";
import { t } from "$lib/translations";

export const POST = async ({ request }: { request: any }) => {
	const { username, password } = await request.json();
	const loginResult = await handleLogin(username, password);
	console.log(loginResult);
	if (!loginResult) throw error(404, t.errors.e404);
	return json(loginResult);
}
