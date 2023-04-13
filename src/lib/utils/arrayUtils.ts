export function stringToStringArray(str: string): string[] {
	return str.split(",");
}
export function removeEmptyStringsFromArray(array: string[]): string[] {
	return array.filter((item) => item.length > 0);
}
export function stringArrayToString(stringArray: string[]): string {
	return stringArray.join(",");
}

export function convertedAndScrubbedArray(str: string) {
	const convertedArray = stringToStringArray(str);
	const filteredArray = removeEmptyStringsFromArray(convertedArray);
	return filteredArray;
}

export const arrayUtils = {
	stringToStringArray: stringToStringArray,
	removeEmptyStringsFromArray: removeEmptyStringsFromArray,
	stringArrayToString: stringArrayToString,
	convertedAndScrubbedArray: convertedAndScrubbedArray,
};
