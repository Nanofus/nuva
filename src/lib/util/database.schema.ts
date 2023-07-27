import type { Generated } from "kysely";

export type Database = {
	users: UserTable;
};

export type UserTable = {
	id: Generated<number>;
	name: string;
	settings_json: string | undefined;
};
