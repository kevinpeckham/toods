export interface ColumnBreakpoint {
	classes?: string;
	order?: number | string;
	width?: number | string;
	widthUnit?: string;
}

export interface Column {
	breakPointDefault?: ColumnBreakpoint;
	breakPointMD?: ColumnBreakpoint;
	breakPointLG?: ColumnBreakpoint;
	handle: string;
	label: string;
	shortLabel?: string;
	symbol?: string;
}
