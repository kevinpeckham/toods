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
	const row = getFieldRow(field) as Row;
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

// patches
export const getFieldNextField = getNextFieldFromField;
export const getRowCells = getAllCellsFromRow;
export const getRowFirstCell = getFirstCellFromRow;
export const getFieldRow = getRowFromField;
export const getFieldCell = getCellFromField;
export const getFieldNextCell = getNextCellFromField;

// export const goUpOneRow = goToPreviousRowSameField;
// export const goDownOneRow = goToNextRowSameField;
export const goLeftOneCell = goToPreviousField;
export const goRightOneCell = goToNextField;

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
};
