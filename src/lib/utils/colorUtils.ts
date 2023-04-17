// functions
import { generateFactors } from "$utils/numberUtils";
export function generateOKLCHColor(
	lightness: number,
	chroma: number,
	hue: number,
) {
	return `oklch(${lightness}% ${chroma} ${hue})`;
}
export function generateOKLCHShades(
	chroma: number,
	hue: number,
	factor?: number,
) {
	const min = 1;
	const max = 999;
	const derivedFactor = factor ? factor : 50;
	const lightnessValues: number[] = generateFactors(min, max, derivedFactor);
	const obj: { [key: number]: string } = {};
	lightnessValues.forEach((lightness) => {
		obj[1000 - lightness] = generateOKLCHColor(lightness / 10, chroma, hue);
	});
	return obj;
}
