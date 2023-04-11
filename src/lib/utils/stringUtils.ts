export function removeHash(str: string) {
	return str.includes("#") ? str.replace("#", "") : str;
}
//- commas
export function removeFinalComma(str: string) {
	return str[str.length - 1] === "," ? str.slice(0, -1) : str;
}
export function removeInitialComma(str: string) {
	return str[0] === "," ? str.slice(1) : str;
}
export function removeRepeatedCommas(str: string) {
	return str.includes(",,") ? str.replace(/,{2,}/g, ",") : str;
}

//- spaces
export function replaceSpacesWithCommas(str: string) {
	return str.includes(" ") ? str.replace(/\s/g, ",") : str;
}

export function stringToArray(str: string): string[] {
	return str.split(",");
}

export function removeUpperCaseLetters(str: string) {
	return str !== str.toLowerCase() ? str.toLowerCase() : str;
}

export function removeBlackListedCharacters(str: string, characters: string[]) {
	return characters.reduce((acc, curr) => acc.replace(curr, ""), str);
}

export function removeUnlistedSpecialCharacters(
	str: string,
	whitelist: string[],
) {
	//regex expression to match
	const matchLetter = new RegExp(/[a-z]|[0-9]|,/, "g");

	return str
		.split("")
		.filter(
			(char) => whitelist.includes(char) || char.match(matchLetter) != null,
		)
		.join("");
}
