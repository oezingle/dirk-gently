
import polygonGenerator from 'polygon-generator';

export interface Coordinate {
    x: number;
    y: number;
};

export type Coordinates = Array<Coordinate>;

/**
 * Generate a centered NGon, normalized to a width / height of 1
 * @param sides
 */
export const generateNGon = (sides: number): Coordinates => {
    const poly = polygonGenerator.polygon(polygonGenerator.coordinates(sides, 1, 0));

    const center: Coordinate = poly.centroid();

    const vertices = poly.vertices.map((vector: Coordinate) => {
        return {
            x: vector.x - center.x,
            y: vector.y - center.y
        }
    })

    return normalizePolygon(vertices);
};

/**
 * Scale a polygon to an area of 1x1.
 * 
 * @param coordinates 
 * @returns 
 */
const normalizePolygon = (coordinates: Coordinates): Coordinates => {
    const size = getPolygonSize(coordinates)

    const widthFactor = 1 / size.width
    const heightFactor = 1 / size.height

    const poly = polygonGenerator.polygon(coordinates)

    const factor = size.width > size.height ? widthFactor : heightFactor

    poly.scale(factor)

    return poly.vertices
}

/**
 * Find the min and max of a given polygon 
 * @param coordinates 
 * @returns 
 */
const generateCoordinateExtremes = (coordinates: Coordinates) => {
    let min_x = Number.MAX_SAFE_INTEGER;
    let min_y = Number.MAX_SAFE_INTEGER;
    let max_x = Number.MIN_SAFE_INTEGER;
    let max_y = Number.MIN_SAFE_INTEGER;

    coordinates.forEach((coordinate) => {
        const { x, y } = coordinate;

        if (x < min_x) min_x = x;
        if (y < min_y) min_y = y;

        if (x > max_x) max_x = x;
        if (y > max_y) max_y = y;
    });

    return {
        min: {
            x: min_x,
            y: min_y
        },
        max: {
            x: max_x,
            y: max_y
        }
    };
};

/**
 * Get the width and height of a polygon's bounding box
 * @param coordinates 
 * @returns 
 */
const getPolygonSize = (coordinates: Coordinates) => {
    const extremes = generateCoordinateExtremes(coordinates);

    return {
        width: Math.abs(extremes.max.x - extremes.min.x),
        height: Math.abs(extremes.max.y - extremes.min.y)
    };
};