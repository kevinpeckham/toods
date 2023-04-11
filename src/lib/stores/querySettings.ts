// cspell: disable

// graphQL
import { gql } from "graphql-request";

export const all_incomplete_todos = gql`
	{
		todos {
			id
			next
			priority
			joy
			friction
			due
			description
			completed
			updated
			unique
			tags
		}
	}
`;

export const upsert = gql`
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
					unique: "lg3po561-zpttps"
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
					unique: "lg3po561-zpttps"
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

export const publilsh = gql`
	mutation publishTodo{
		publishTodo(
			where: { unique: "lg3po561-zpttps" }, to: PUBLISHED)
		) {
			unique
			stage
		}
	}
`;
