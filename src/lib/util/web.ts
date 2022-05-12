import type { Coordinate } from "./geometry"
import { objectMap } from "./object"

export interface WebNode {
    title: string,
    description?: string,
    category?: string,
    coordinate?: Coordinate,
}

export type AuditedWebNode = NonNullable<WebNode>

export interface WebEdge {
    start: string,
    end: string,
    description?: string,
}

export interface WebCategory {
    color?: string,
    size?: number,
}

export interface Web {
    nodes: Record<string, WebNode>,
    edges: Array<WebEdge>,
    categories: Record<string, WebCategory>
}

export const populateWebNode = (node: WebNode): AuditedWebNode => {
    return {
        title: node.title,
        description: node.description ?? "",
        category: node.category ?? "default",
    }
}

export const populateWebEdge = (edge: WebEdge): WebEdge => {
    return {
        start: edge.start,
        end: edge.end,
        description: edge.description ?? "",
    }
}

export const populateWebCategory = (category: WebCategory): WebCategory => {
    return {
        color: category.color ?? "#ffffff",
        size: category.size ?? 10,
    }
}

export const auditWeb = (web: Web): Web => {
    if (!web.categories) web.categories = {}

    const { edges } = web;
    let { nodes, categories } = web;

    const isANode = (name: any) => name in nodes

    const isACategory = (name: any) => name in categories

    if (!isACategory('default')) {
        categories['default'] = {}
    }

    nodes = objectMap(nodes, (_: string, node: WebNode) => {
        node = populateWebNode(node)

        if (!isACategory(node.category)) throw new Error(`Referenced Category '${node.category}' Doesn't Exist`)

        return node
    });
    categories = objectMap(categories, (_: string, value: WebCategory) => populateWebCategory(value));


    return {
        nodes,
        categories,
        edges: edges.map((edge) => {
            if (!isANode(edge.start)) throw new Error(`Referenced Node '${edge.start}' Doesn't Exist`)
            if (!isANode(edge.end)) throw new Error(`Referenced Node '${edge.end}' Doesn't Exist`)

            return populateWebEdge(edge)
        }),
    }
}

export const getWebIndex = (web: Web, name: string): number => {
    return Object.keys(web.nodes).indexOf(name)
}