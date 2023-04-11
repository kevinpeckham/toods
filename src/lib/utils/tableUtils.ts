export function nextField() {
	console.log("test");
}

type Cell = HTMLDivElement | null;
type Row = HTMLDivElement | null;
type Field = HTMLInputElement | null;

export function getFieldRow(field: Field) {
	return field?.closest("[data-table-row]") as Row;
}
export function getFieldCell(field: Field) {
	return field?.parentElement as Cell;
}
export function getRowFirstCell(row: Row) {
	return row?.firstElementChild as Cell;
}

export function getFieldNextCell(field: Field) {
	const row = getFieldRow(field) as Row;
	const cell = getFieldCell(field) as Cell;
	const cell_next_sibling = cell?.nextElementSibling as Cell;
	const new_row = row?.nextElementSibling as Row;

	// if cell is not last cell in parent
	if (cell_next_sibling) {
		return cell_next_sibling;
	}
	// else if cell is last cell in parent
	else if (new_row) {
		const cell = getRowFirstCell(new_row) as Cell;
		if (cell) return cell;
	}
	//
	else return null;
}

export function getFieldNextField(field: Field): Field {
	const cell = getFieldNextCell(field) as Cell;
	const next_field = cell?.firstElementChild as Field;
	return next_field;
}

export function getRowCells(row: Row): Cell[] {
	const cells = Array.from(row?.children as HTMLCollectionOf<Cell>);
	return cells;
}
export function getCellPositionInRow(cell: Cell) {
	const row = cell?.parentElement as Row;
	const cells = getRowCells(row);
	const index = cells.indexOf(cell);
	return index;
}

export function goDownOneRow(field: Field) {
	const handle = field?.dataset.field;
	const row = getFieldRow(field) as Row;
	const next_row = row?.nextElementSibling as Row;
	const new_field = next_row?.querySelector(`[data-field=${handle}]`) as Field;
	if (new_field) new_field.focus();
}
export function goUpOneRow(field: Field) {
	const handle = field?.dataset.field;
	const row = getFieldRow(field) as Row;
	const prev_row = row?.previousElementSibling as Row;
	const new_field = prev_row?.querySelector(`[data-field=${handle}]`) as Field;
	if (new_field) new_field.focus();
}
