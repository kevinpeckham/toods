import { todos, todos_counter } from "$stores/todosStore";
import type { Todo } from "$types/todoTypes";
import { get } from "svelte/store";

type Cell = HTMLDivElement | null;
type Row = HTMLDivElement | HTMLButtonElement | null;
type Field = HTMLInputElement | null;

// get fields field
export function getNextFieldFromField(field: Field) {
	const next_cell = getNextCellFromField(field) as Cell;
	const next_cell_child = next_cell?.firstElementChild;
	if (next_cell_child?.tagName.toLowerCase() == "input") {
		return next_cell_child as Field;
	} else return null;
}
export function getPreviousFieldFromField(field: Field) {
	const previous_cell = getPreviousCellFromField(field) as Cell;
	const previous_cell_child = previous_cell?.firstElementChild;
	const previous_field = previous_cell?.firstElementChild as Field;
	if (previous_cell_child?.tagName.toLowerCase() == "input") {
		return previous_cell_child as Field;
	} else return null;
}

// get fields from row
export function getFirstFieldFromRow(row: Row) {
	const field = row?.querySelector("input") as Field;
	return field as Field;
}
export function getLastFieldFromRow(row: Row) {
	const cell = getLastCellFromRow(row) as Cell;
	return cell?.firstElementChild as Field;
}

// get cells from field
export function getCellFromField(field: Field) {
	return field?.parentElement as Cell;
}
export function getNextCellFromField(field: Field) {
	const cell = getCellFromField(field) as Cell;
	const next_cell = cell?.nextElementSibling as Cell;
	return next_cell;
}
export function getPreviousCellFromField(field: Field) {
	const cell = getCellFromField(field) as Cell;
	const previous_cell = cell?.previousElementSibling as Cell;
	return previous_cell;
}

// get cells from row
export function getFirstCellFromRow(row: Row) {
	return row?.firstElementChild as Cell;
}
export function getLastCellFromRow(row: Row) {
	return row?.lastElementChild as Cell;
}
export function getAllCellsFromRow(row: Row): Cell[] | null {
	const children = row?.children;
	const cells = children ? (Array.from(children) as Cell[]) : ([] as Cell[]);
	return cells;
}

// get rows from field
export function getRowFromField(field: Field): Row {
	return field?.closest("[data-table-row]") as Row;
}

// get rows from row
export function getNextRowFromRow(row: Row): Row | null {
	const next_row = row?.nextElementSibling as Row;
	return next_row;
}
export function getPreviousRowFromRow(row: Row): Row | null {
	const prev_row = row?.previousElementSibling as Row;
	return prev_row;
}

// go to fields from fields
export function goToNextRowSameField(field: Field) {
	const handle = field?.dataset.field;
	const row = getRowFromField(field) as Row;
	const next_row = getNextRowFromRow(row) as Row;
	const new_field = next_row?.querySelector(`[data-field=${handle}]`) as Field;
	if (new_field) new_field.focus();
	return new_field;
}
export function goToPreviousRowSameField(field: Field) {
	const handle = field?.dataset.field;
	const row = getRowFromField(field) as Row;
	const prev_row = getPreviousRowFromRow(row) as Row;
	const new_field = prev_row?.querySelector(`[data-field=${handle}]`) as Field;
	if (new_field) new_field.focus();
	return new_field;
}
export function goToPreviousField(field: Field) {
	const previous_field = getPreviousFieldFromField(field);
	// if there is a previous field, focus it
	if (previous_field) return previous_field.focus();
	// if there is no previous field, focus the row
	else {
		const row = getRowFromField(field);
		row?.focus();
	}
}
export function goToNextField(field: Field) {
	const next_field = getNextFieldFromField(field);
	// if there is a next field, focus it
	if (next_field) return next_field.focus();
	// if there is no previous field, focus the next row
	else {
		const row = getRowFromField(field);
		const next_row = getNextRowFromRow(row);
		next_row?.focus();
	}
}

// go to rows from row
export function goDownOneRow(row: Row) {
	const next_row = getNextRowFromRow(row);
	if (next_row) next_row.focus();
	return next_row;
}
export function goUpOneRow(row: Row) {
	const previous_row = tableUtils.getPreviousRowFromRow(row);
	if (previous_row) previous_row.focus();
	return previous_row;
}
export function goToFirstFieldFromRow(row: Row) {
	const first_field = getFirstFieldFromRow(row);
	if (first_field) first_field.focus();
	return first_field;
}
export function goToPreviousRowLastFieldFromRow(row: Row) {
	const previous_row = getPreviousRowFromRow(row);
	const last_field = getLastFieldFromRow(previous_row);
	if (last_field) last_field.focus();
	return last_field;
}

// traverse
function down(event: KeyboardEvent, flags?: string) {
	// prevent default?
	if (flags?.includes("preventDefault")) event.preventDefault();

	// go down
	const input = event.target as Field;
	goToNextRowSameField(input);
}
function left(event: KeyboardEvent, flags?: string) {
	// prevent default?
	if (flags?.includes("preventDefault")) event.preventDefault();

	// go left
	const input = event.target as Field;
	goToPreviousField(input);
}
function right(event: KeyboardEvent, flags?: string) {
	// prevent default?
	if (flags?.includes("preventDefault")) event.preventDefault();

	// move right
	const input = event.target as Field;
	goToNextField(input);
}
function up(event: KeyboardEvent, flags?: string) {
	// prevent default?
	if (flags?.includes("preventDefault")) event.preventDefault();

	// move up
	const input = event.target as Field;
	goToPreviousRowSameField(input);
}

//- get adjacent todos
function getPrecedingTodoByOrder(starting_order: number, store: Todo[]) {
	// get all preceding todos
	const all_preceding_todos = store.filter(
		(todo) => (todo.order ? todo.order : 0) < starting_order,
	);

	// escape hatch if no preceding todos
	if (all_preceding_todos.length == 0) return null;

	// sort preceding todos
	all_preceding_todos.sort(
		(a, b) => (b.order ? b.order : 0) - (a.order ? a.order : 0),
	);
	const todo_at_target = all_preceding_todos[0];
	console.log(todo_at_target.order);
	return todo_at_target;
}

function getNextTodoByOrder(starting_order: number, store: Todo[]) {
	// get all subsequent todos
	const all_subsequent_todos = store.filter(
		(todo) => (todo.order ? todo.order : 0) > starting_order,
	);

	// escape hatch if we're at the end
	if (all_subsequent_todos.length == 0) return null;

	// sort subsequent todos
	all_subsequent_todos.sort(
		(a, b) => (a.order ? a.order : 0) - (b.order ? b.order : 0),
	);
	const todo_at_target = all_subsequent_todos[0];
	return todo_at_target;
}

//- MOVING ROWS
function moveRow(unique: string, dir: string) {
	const store = get(todos);
	const count = get(todos_counter);

	// this todo
	const focused_todo = get(todos).filter((todo) => todo.unique == unique)[0];
	const starting_order = Number(JSON.stringify(focused_todo.order));
	const target_order = dir == "up" ? starting_order - 1 : starting_order + 1;

	// guard rails -- keep from moving past the top or bottom of the list
	if (target_order < 0) return;
	if (target_order >= count) return;

	// other todo at target position
	// let todo_at_target = Todo;
	// get all todos with order less than current order

	const todo_at_target =
		dir == "up"
			? getPrecedingTodoByOrder(starting_order, store)
			: getNextTodoByOrder(starting_order, store);

	// return if there is no todo at target
	if (!todo_at_target) return;

	const other_unique = JSON.parse(JSON.stringify(todo_at_target.unique));
	const other_todo = store.filter((todo) => todo.unique == other_unique)[0];

	// swap orders
	focused_todo.order = target_order;
	other_todo.order = starting_order;

	// update store
	todos.set(store);

	// wait a beat and give time for updated rows to render
	setTimeout(() => {
		const button = document.getElementById(
			`todo-${unique}`,
		) as HTMLButtonElement;
		button?.focus();
	}, 40);
}

export const tableUtils = {
	// get fields from field
	getNextFieldFromField: getNextFieldFromField,
	getPreviousFieldFromField: getPreviousFieldFromField,

	// get fields from row
	getFirstFieldFromRow: getFirstFieldFromRow,
	getLastFieldFromRow: getLastFieldFromRow,

	// get cells from field
	getCellFromField: getCellFromField,
	getNextCellFromField: getNextCellFromField,
	getPreviousCellFromField: getPreviousCellFromField,

	// get cells from row
	getFirstCellFromRow: getFirstCellFromRow,
	getLastCellFromRow: getLastCellFromRow,
	getAllCellsFromRow: getAllCellsFromRow,

	// get rows from field
	getRowFromField: getRowFromField,

	// get rows from row
	getNextRowFromRow: getNextRowFromRow,
	getPreviousRowFromRow: getPreviousRowFromRow,

	// go to field from field
	goToPreviousRowSameField: goToPreviousRowSameField,
	goToNextRowSameField: goToNextRowSameField,
	goToPreviousField: goToPreviousField,
	goToNextField: goToNextField,

	// go to field from row
	goToFirstFieldFromRow: goToFirstFieldFromRow,
	goToPreviousRowLastFieldFromRow: goToPreviousRowLastFieldFromRow,

	// go to row from row
	goDownOneRow: goDownOneRow,
	goUpOneRow: goUpOneRow,

	// traverse
	up: up,
	right: right,
	down: down,
	left: left,

	// move row
	moveRow: moveRow,
};
