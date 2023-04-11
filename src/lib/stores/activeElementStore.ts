import { writable, type Writable } from "svelte/store";

export const activeElement: Writable<HTMLElement | null> = writable(null);
