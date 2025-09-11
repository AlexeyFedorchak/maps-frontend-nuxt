export type LatHem = 'N' | 'S'
export type LonHem = 'E' | 'W'

export const toSignedLat = (abs: number, hem: LatHem) => (hem === 'S' ? -Math.abs(abs) : Math.abs(abs))
export const toSignedLon = (abs: number, hem: LonHem) => (hem === 'W' ? -Math.abs(abs) : Math.abs(abs))

export const splitLat = (lat: number): { abs: number; hem: LatHem } =>
    lat >= 0 ? { abs: lat, hem: 'N' } : { abs: Math.abs(lat), hem: 'S' }

export const splitLon = (lon: number): { abs: number; hem: LonHem } =>
    lon >= 0 ? { abs: lon, hem: 'E' } : { abs: Math.abs(lon), hem: 'W' }
