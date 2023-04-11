export function advanceCursorToEndOfTextInput(
	input: HTMLInputElement,
	value: string,
) {
	const snapshot = JSON.parse(JSON.stringify(value)); // to get cursor to end of input
	input.value = "";
	input.value = snapshot;
}
