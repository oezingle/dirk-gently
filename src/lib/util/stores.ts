import { writable, type Writable } from "svelte/store"
import type { Web } from "./web";

export const hoveredNode: Writable<string | undefined> = writable();

export const nodeTransparency = (value: string | undefined, ...nodes: Array<string>) => {
    const hasNode = !value || nodes.includes(value)

    return hasNode ? 1.0 : 0.1
}

export const webStore: Writable<Web> = writable();