/** @type {import('tailwindcss').Config} */

export default {
	content: ["./src/**/*.{html,pug,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				lemon: {
					"25": "oklch(97.5% 0.2 114)",
					"50": "oklch(95% 0.2 114)",
					"75": "oklch(92.5% 0.2 114)",
					"100": "oklch(90% 0.2 114)",
					"125": "oklch(87.5% 0.2 114)",
					"150": "oklch(85% 0.2 114)",
					"175": "oklch(82.5% 0.2 114)",
					"200": "oklch(80% 0.2 114)",
					"225": "oklch(77.5% 0.2 114)",
					"250": "oklch(75% 0.2 114)",
					"275": "oklch(72.5% 0.2 114)",
					"300": "oklch(70% 0.2 114)",
					"325": "oklch(67.5% 0.2 114)",
					"350": "oklch(65% 0.2 114)",
					"375": "oklch(62.5% 0.2 114)",
					"400": "oklch(60% 0.2 114)",
					"425": "oklch(57.5% 0.2 114)",
					"450": "oklch(55% 0.2 114)",
					"475": "oklch(52.5% 0.2 114)",
					"500": "oklch(50% 0.2 114)",
					"525": "oklch(47.5% 0.2 114)",
					"550": "oklch(45% 0.2 114)",
					"575": "oklch(42.5% 0.2 114)",
					"600": "oklch(40% 0.2 114)",
					"625": "oklch(37.5% 0.2 114)",
					"650": "oklch(35% 0.2 114)",
					"675": "oklch(32.5% 0.2 114)",
					"700": "oklch(30% 0.2 114)",
					"725": "oklch(27.5% 0.2 114)",
					"750": "oklch(25% 0.2 114)",
					"775": "oklch(22.5% 0.2 114)",
					"800": "oklch(20% 0.2 114)",
					"825": "oklch(17.5% 0.2 114)",
					"850": "oklch(15% 0.2 114)",
					"875": "oklch(12.5% 0.2 114)",
					"900": "oklch(10% 0.2 114)",
					"925": "oklch(7.5% 0.2 114)",
					"950": "oklch(5% 0.2 114)",
					"975": "oklch(2.5% 0.2 114)",
				},
				oxford: {
					"25": "oklch(97.5% 0.05 260)",
					"50": "oklch(95% 0.05 260)",
					"75": "oklch(92.5% 0.05 260)",
					"100": "oklch(90% 0.05 260)",
					"125": "oklch(87.5% 0.05 260)",
					"150": "oklch(85% 0.05 260)",
					"175": "oklch(82.5% 0.05 260)",
					"200": "oklch(80% 0.05 260)",
					"225": "oklch(77.5% 0.05 260)",
					"250": "oklch(75% 0.05 260)",
					"275": "oklch(72.5% 0.05 260)",
					"300": "oklch(70% 0.05 260)",
					"325": "oklch(67.5% 0.05 260)",
					"350": "oklch(65% 0.05 260)",
					"375": "oklch(62.5% 0.05 260)",
					"400": "oklch(60% 0.05 260)",
					"425": "oklch(57.5% 0.05 260)",
					"450": "oklch(55% 0.05 260)",
					"475": "oklch(52.5% 0.05 260)",
					"500": "oklch(50% 0.05 260)",
					"525": "oklch(47.5% 0.05 260)",
					"550": "oklch(45% 0.05 260)",
					"575": "oklch(42.5% 0.05 260)",
					"600": "oklch(40% 0.05 260)",
					"625": "oklch(37.5% 0.05 260)",
					"650": "oklch(35% 0.05 260)",
					"675": "oklch(32.5% 0.05 260)",
					"700": "oklch(30% 0.05 260)",
					"725": "oklch(27.5% 0.05 260)",
					"750": "oklch(25% 0.05 260)",
					"775": "oklch(22.5% 0.05 260)",
					"800": "oklch(20% 0.05 260)",
					"825": "oklch(17.5% 0.05 260)",
					"850": "oklch(15% 0.05 260)",
					"875": "oklch(12.5% 0.05 260)",
					"900": "oklch(10% 0.05 260)",
					"925": "oklch(7.5% 0.05 260)",
					"950": "oklch(5% 0.05 260)",
					"975": "oklch(2.5% 0.05 260)",
				},
				primary: "oklch(25% 0.05 260)",
				accent: "oklch(90% 0.2 114)",
			},
			fontFamily: {
				mono: [
					"'Mono Lisa'",
					"ui-monospace",
					"SFMono-Regular",
					"Menlo",
					"Monaco",
					"Consolas",
					"Liberation Mono",
					"Courier New",
					"monospace",
				],
			},
			fontSize: {
				6: "6px",
				7: "7px",
				8: "8px",
				9: "9px",
				10: "10px",
				11: "11px",
				12: "12px",
				13: "13px",
				14: "14px",
				15: "15px",
				16: "16px",
				17: "17px",
				18: "18px",
				19: "19px",
				20: "20px",
				21: "21px",
				22: "22px",
				23: "23px",
				24: "24px",
				25: "25px",
				26: "26px",
				27: "27px",
				28: "28px",
				29: "29px",
				30: "30px",
				31: "31px",
				32: "32px",
				33: "33px",
				34: "34px",
				35: "35px",
				36: "36px",
				37: "37px",
				38: "38px",
				39: "39px",
				40: "40px",
				41: "41px",
				42: "42px",
				43: "43px",
				44: "44px",
				45: "45px",
				46: "46px",
				47: "47px",
				48: "48px",
				49: "49px",
				50: "50px",
			},
		},
	},
};
