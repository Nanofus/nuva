/*
	This module is used by the /todos endpoint to
	make calls to api.svelte.dev, which stores todos
	for each user. The leading underscore indicates that this is
	a private module, _not_ an endpoint — visiting /todos/_api
	will net you a 404 response.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

import WPAPI from 'wpapi';
const wp = new WPAPI({ endpoint: 'https://klaanon.fi/wp-json' });

export async function posts() {
	return await wp.posts().then((data) => {
		console.log(data);
		return data;
	}).catch(function(err) {
		console.error(err);
	});;
}
