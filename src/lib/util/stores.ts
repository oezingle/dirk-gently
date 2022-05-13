import { writable, type Writable } from "svelte/store"

export const hoveredNode: Writable<string | undefined> = writable();

export const nodeTransparency = (value: string | undefined, ...nodes: Array<string>) => {
    const hasNode = !value || nodes.includes(value)

    return hasNode ? 1.0 : 0.1
}