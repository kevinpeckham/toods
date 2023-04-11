// fetches data from the server

// graphQl
import { GraphQLClient } from "graphql-request";

// types
import type { LayoutServerData } from "./$types";
import type { Todo } from "$types/todoTypes";

// settings
import { read_only_api, app_token } from "$stores/apiSettings";
import { all_incomplete_todos } from "$stores/querySettings";

const query = all_incomplete_todos;

//eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export async function load(event: LayoutServerData) {
	const graphQLClient = new GraphQLClient(read_only_api, {
		headers: {},
	});
	const content: Record<"todos", Todo[]> = await graphQLClient.request(query);

	return {
		content,
	};
}
