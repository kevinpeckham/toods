// fetches data from the server

// graphQl
import { gql, request, GraphQLClient } from "graphql-request";

// types
// import type { LayoutServerData } from "./$types";
import type { Todo } from "$types/todoTypes";

// settings
import { content_api, app_token, read_only_api } from "$stores/apiSettings";
import { upsert, all_incomplete_todos } from "$stores/querySettings";

const app_authorization = `Bearer ${app_token}`;

//eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars

export async function getAllIncompleteTodos() {
	const client = new GraphQLClient(read_only_api, {
		headers: {},
	});
	const content: Record<"todos", Todo[]> = await client.request(
		all_incomplete_todos,
	);
	return content;
}

export async function getTodoFromHygraph(todo: Todo) {
	const unique = todo.unique;
	const client = new GraphQLClient(read_only_api, {
		headers: {},
	});
	const query = `{
    todos(where: {unique: "${unique}"}) {
      completed
      description
      due
      friction
      joy
      next
      priority
      tags
      unique
      updated
    }
  }`;
	const content: Record<"todos", Todo[]> = await client.request(query);
	console.log("request", todo);
	console.log("return", content);
	return content;
}

export async function upsertTodo(todo: Todo) {
	const client = new GraphQLClient(content_api, {
		headers: { authorization: app_authorization },
	});
	//console.log(JSON.stringify(todo, null, 2));
	const query = gql`
		mutation upsertTodo {
			upsertTodo(
				where: { unique: "lg3po561-zpttps" }
				upsert: {
					create: {
						completed: true
						created: "2023-04-05T17:04:58.271Z"
						description: "Alexandra Meeeting"
						due: "2023-04-20"
						friction: 2
						joy: 2
						next: false
						priority: 2
						tags: ["sales"]
					}
					update: {
						completed: true
						created: "2023-04-05T17:04:58.271Z"
						description: "Alexandra Meeeting"
						due: "2023-04-20"
						friction: 2
						joy: 2
						next: false
						priority: 2
						tags: ["sales"]
					}
				}
			) {
				id
				completed
				created
				description
				due
				friction
				joy
				next
				priority
				unique
				updated
				tags
			}
		}
	`;
	// const content: Record<"todos", Todo[]> = await client.request(query);
	//client.request(query).then((data) => console.log(data));
	return;
}
