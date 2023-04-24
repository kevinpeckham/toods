export async function getItemFromLocalStorage(
	key: string,
	callback: (item: string) => void,
): Promise<void> {
	try {
		const item = await localStorage.getItem(key);
		if (item !== null) {
			callback(item);
		}
	} catch (error) {
		console.error(`Error retrieving item from localStorage: ${error}`);
	}
}
