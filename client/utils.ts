export const event = (name: string): string => {
    return `lit-speedometer:${name}`
}

export const toTkm = (miles: number): number => {
    return miles * 3.6;
}

export const vec3ToVelocity = (vec3: number[]): number => {
    return Math.sqrt(vec3[0] ** 2 + vec3[1] ** 2 + vec3[2] ** 2);
}



