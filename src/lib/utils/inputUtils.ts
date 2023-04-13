export const inputUtils = {
	advanceCursorToEndOfTextInput: advanceCursorToEndOfTextInput,
	setReadOnly: setReadOnly,
	removeReadOnly: removeReadOnly,
	toggleReadOnly: toggleReadOnly,
};

export function toggleReadOnly(event: KeyboardEvent | MouseEvent) {
	const input = event.target as HTMLInputElement;
	input.readOnly ? removeReadOnly(event) : setReadOnly(event);
}
export function removeReadOnly(event: KeyboardEvent | MouseEvent) {
	const input = event.target as HTMLInputElement;
	if (input.readOnly) input.removeAttribute("readonly");
}
export function setReadOnly(event: KeyboardEvent | MouseEvent) {
	const input = event.target as HTMLInputElement;
	if (!input.readOnly) input.setAttribute("readonly", "readonly");
}
export function advanceCursorToEndOfTextInput(
	input: HTMLInputElement,
	value: string,
) {
	const snapshot = JSON.parse(JSON.stringify(value)); // to get cursor to end of input
	input.value = "";
	input.value = snapshot;
}
