export interface Link {
	linkText: string;
	url: string;
}

export function extractMarkdownLinks(input_text: string) {
	const regex_markdown_links = /\[([^\]]+)\]\(([^)]+)\)/gi;
	let match: null | RegExpExecArray;

	const resultArray: Link[] = [];

	while ((match = regex_markdown_links.exec(input_text)) !== null) {
		const linkText = match[1];
		const url = match[2];
		if (linkText && url) {
			resultArray.push({ linkText: linkText, url: url });
		}
		console.log(`Link text: ${linkText}, URL: ${url}`);
	}
	return resultArray;
}
