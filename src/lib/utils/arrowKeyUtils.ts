export function parseArrowKeys(event: KeyboardEvent) {
	// prevent default
	event.preventDefault();

	const key = event.key;

	// elements
	const activeElement = document.activeElement as HTMLElement;
	const container = activeElement.parentElement as HTMLDivElement;
	const this_row = container.parentElement as HTMLDivElement;
	const table = this_row.parentElement as HTMLDivElement;

	// next
	const next_container_in_this_row = container.nextElementSibling;
	const next_field_in_this_row = next_container_in_this_row?.firstElementChild;
	const next_row = this_row.nextElementSibling;

	// previous
	const previous_container_in_this_row = container.previousElementSibling;
	const previous_field_in_this_row =
		previous_container_in_this_row?.firstElementChild as HTMLInputElement;
	const previous_row = this_row.previousElementSibling as HTMLDivElement;
	const last_container_in_previous_row =
		previous_row?.firstElementChild as HTMLDivElement;
	const last_field_in_previous_row =
		last_container_in_previous_row?.firstElementChild as HTMLInputElement;

	const previous_field = previous_field_in_this_row
		? previous_field_in_this_row
		: last_field_in_previous_row
		? last_field_in_previous_row
		: null;

	// booleans
	const this_is_last_row = this_row == table.lastElementChild;
	const this_is_first_row = this_row == table.firstElementChild;

	function getNextTableCell() {
		const activeElement = document.activeElement as HTMLElement;
		const next_element_in_this_row = activeElement.nextElementSibling;
		if (next_element_in_this_row) return next_element_in_this_row;
		else return null;
	}

	// if the key is not an arrow key, return
	if (!key.toLowerCase().includes("arrow")) return;
	else if (key == "ArrowUp") {
		if (previous_row) console.log(previous_row);
		else return;
	} else if (key == "ArrowRight") {
		//console.log(getNextTableCell());
	}
	// advance tab

	// next row

	// find the first child of nextRow that is an HTMLInputElement
	const next_row_first_cell = next_row
		? (next_row.querySelector("[data-cell-input]") as HTMLElement)
		: null;

	//console.log(next_row_first_cell)
}
