export const objectMap = (object: any, fn: Function) => {
    const tempObject: Record<string, any> = {}

    Object.keys(object).map((key, index) => {
        tempObject[key] = fn(key, object[key], index)
    })

    return tempObject
}