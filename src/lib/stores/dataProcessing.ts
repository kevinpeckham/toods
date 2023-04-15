//- store functions
import { get } from "svelte/store";

//- types
import type { Todo } from "$types/todoTypes";

//- stores
import { backup_data } from "$stores/backupData";
import { symbols } from "$stores/settings";

//- constants
const tag_delimiter = "#";
const description_delimiter = "^";
const symbols_store = get(symbols);
const symbol_friction = symbols_store.friction;
const symbol_joy = symbols_store.joy;
const symbol_priority = symbols_store.priority;

export const testDatum: Todo = {
	completed: null,
	next: false,
	created: "2023-04-03",
	due: "",
	friction: 3,
	joy: 2,
	priority: 1,
	description: "fix dev environment: Zenith Terminals",
	tags: ["slx", "web"],
};

type TodoArray = string[];

// packing functions
function convertTodoToArray(todo: Todo): string[] {
	const array: string[] = [
		// fixed length data-points
		// id -- (0,5)
		todo.id.toString() ? todo.id.toString().padStart(6, "0") : "",
		// completed (6,6)
		todo.completed ? "1" : "0",
		// next -- 6,6
		todo.next ? "1" : "0", // next -- always 1 digit
		// created -- YYMMDD -- always 8 digits
		todo.created ? todo.created.replace(/-/g, "") : "00000000",
		// due -- YYMMDD -- always 8 digits
		todo.due ? todo.due.replace(/-/g, "") : "00000000",
		// friction -- always 1 digit
		todo.friction ? todo.friction.length.toString() : "0",
		// joy -- always 1 digit
		todo.joy ? todo.joy.length.toString() : "0",
		// priority -- always 1 digit
		todo.priority ? "" + todo.priority.length : "0",
		// variable length data-points
		// tags
		todo.tags && todo.tags[0]
			? tag_delimiter + todo.tags.join("," + tag_delimiter)
			: tag_delimiter + "null",
		// description
		todo.description
			? description_delimiter + todo.description.replace(/ /g, "_")
			: "", // description
	];
	return array;
}
function convertTodoArrayToString(array: TodoArray): string {
	const string = array.toString();
	return string;
}

// simple function to compress repeated numbers
// e.g. 1111 -> 4t1
function compressRepeatedNumbers(string: string): string {
	const regex = /(\d)\1+/g;
	const compressed = string.replace(regex, (match) => {
		const length = match.length;
		const first = match[0];
		return `${length}t${first}`;
	});
	return compressed;
}
function unCompressNumbers(string: string): string {
	const regex = /(\d)t(\d)/g;
	const uncompressed = string.replace(regex, (match, length, digit) => {
		const repeated = digit.repeat(Number(length));
		return repeated;
	});
	return uncompressed;
}

const compressionLibrary = {
	// hot words -- 2 characters
	add: "a%",
	bug: "b%",
	dev: "d%",
	email: "e%",
	game: "g%",
	fix: "f%",
	idea: "i%",
	learn: "l%",
	new: "n%",
	out: "o%",
	pick: "p%",
	reach: "r%",
	web: "w%",

	analytics: "a7s",
	appointment: "a9t",
	billing: "b6g",
	checkbox: "c6x",
	content: "c5t",
	dropdown: "d6n",
	environment: "e9t",
	image: "i3e",
	invoice: "i5e",
	migrate: "m5e",
	review: "r4w",
	safari: "s5f",
	terminal: "t6l",
	website: "w5e",
	zenith: "z5h",
};

function compressWords(string: string): string {
	const array = Object.entries(compressionLibrary);
	let result = string;

	array.forEach((entry) => {
		const [word, compressed] = entry;

		// match word from library
		const regex = new RegExp(word, "gi");

		// replace it with compressed version
		result = result.replace(regex, (match) => {
			const isCapitalized = match[0] === match[0].toUpperCase();
			const lower = compressed;
			const upper = match[0].toUpperCase() + compressed.slice(1);
			return isCapitalized ? upper : lower;
		});
	});
	// result.includes("dropdown") ? result.replace("dropdown", "d6n") : result;
	return result;
}

function unCompressWords(string: string): string {
	const array = Object.entries(compressionLibrary);
	let result = string;
	array.forEach((entry) => {
		const [word, compressed] = entry;

		// match compressed word from library
		const regex = new RegExp(compressed, "gi");

		result = result.replace(regex, (match) => {
			const isCapitalized = match[0] === match[0].toUpperCase();
			const lower = word;
			const upper = match[0].toUpperCase() + word.slice(1);
			return isCapitalized ? upper : lower;
		});
	});
	// result.includes("dropdown") ? result.replace("dropdown", "d6n") : result;
	return result;
}

//function to convert letters to numbers
//e.g. a -> 1
function convertLettersToNumbers(string: string): string {
	const regex = /[a-z]/g;
	const converted = string.replace(regex, (match) => {
		const number = match.charCodeAt(0) - 96;
		// padded to 2 digits
		return number.toString().padStart(2, "0");
	});
	return converted;
}

function packTodo(todo: Todo): string {
	const array: TodoArray = convertTodoToArray(todo);
	const string = convertTodoArrayToString(array);
	const delimited = string.replace(/,/g, "");
	const numbersCompressed = compressRepeatedNumbers(delimited);
	const textCompressed = compressWords(numbersCompressed);
	return textCompressed;
}

// unpacking & extracting functions
function unpackYear(sub: string) {
	return sub.slice(0, 4);
}
function unpackMonth(sub: string) {
	return sub.slice(4, 6);
}
function unpackDay(sub: string) {
	return sub.slice(6, 8);
}
function dateIsValid(sub: string) {
	return sub.length === 8 && Number(sub) != 0;
}
function extractDate(sub: string) {
	const year = unpackYear(sub);
	const month = unpackMonth(sub);
	const day = unpackDay(sub);
	const string = `${year}-${month}-${day}`;
	return dateIsValid(sub) ? string : "";
}
function extractRating(sub: string, sym: string) {
	const length = Number(sub);
	return length > 0 ? sym.repeat(length) : "";
}
function extractBoolean(sub: string) {
	return sub === "1";
}
function extractNumber(sub: string) {
	return Number(sub);
}
function extractTags(sub: string) {
	const trimInitial = sub.slice(tag_delimiter.length);
	const tags = trimInitial.split(tag_delimiter);
	const filtered = tags.filter((tag) => tag !== "null");
	return filtered;
}
function extractDescription(sub: string) {
	const trimInitial = sub.slice(description_delimiter.length);
	const description = trimInitial.replace(/_/g, " ");
	return description;
}
function unpackTodo(s: string) {
	// uncompressed values
	const n = unCompressNumbers(s);
	const u = unCompressWords(n);

	// packed values
	const raw = {
		id: u.slice(0, 6),
		completed: u.slice(6, 7),
		next: u.slice(7, 8),
		created: u.slice(8, 16),
		due: u.slice(16, 24),
		friction: u.slice(24, 25),
		joy: u.slice(25, 26),
		priority: u.slice(26, 27),
		tags: u.slice(27, u.indexOf(description_delimiter)),
		description: u.slice(u.indexOf(description_delimiter)),
	};

	// extracted values
	const id = extractNumber(raw.id);
	const co = extractBoolean(raw.completed);
	const ne = extractBoolean(raw.next);
	const cr = extractDate(raw.created);
	const du = extractDate(raw.due);
	const fr = extractRating(raw.friction, symbol_friction);
	const jo = extractRating(raw.joy, symbol_joy);
	const pr = extractRating(raw.priority, symbol_priority);
	const ta = extractTags(raw.tags);
	const de = extractDescription(raw.description);

	// return object
	const obj: Todo = {
		id: id,
		completed: co,
		next: ne,
		created: cr,
		due: du,
		friction: fr,
		joy: jo,
		priority: pr,
		tags: ta,
		description: de,
	};
	return obj;
}

function decompress_and_parse_todo(todo: string): Todo {
	const array = JSON.parse(todo) as string[];
	return {
		id: parseInt(array[0]),
		completed: array[1] === "1" ? true : false,
		created: array[2],
		description: array[3],
		due: array[4],
		friction: array[5],
		joy: array[6],
		next: array[7] === "1" ? true : false,
		priority: array[8],
		tags: array[9].split(","),
	};
}

// export const decompressed_and_parsed_todo = decompress_and_parse_todo(
// 	compressed_and_stringified,
// );

const parsed_backup_data = JSON.parse(backup_data) as Todo[];

export const compressed_backup_data = parsed_backup_data.map((todo) =>
	packTodo(todo),
);

export const stringified_backup_data = compressed_backup_data.toString();
// .replace(/"/g, "");

export const packed_data = packTodo(testDatum);
export const unpacked_data = unpackTodo(packed_data);
