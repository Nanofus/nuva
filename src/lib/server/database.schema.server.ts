import type { Generated } from "kysely";

export type Database = {
  users: UserTable;
};

export type UserTable = {
  id: Generated<number>;
  username: string;
  name: string;
  settings_json: string | null;
};
