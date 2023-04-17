export function generateFactors(min: number, max: number, factor: number) {
	const factors = [];
	for (let i = Math.ceil(min / factor); i <= Math.floor(max / factor); i++) {
		factors.push(i * factor);
	}
	return factors;
}
