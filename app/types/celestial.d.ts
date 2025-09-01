declare global {
    interface Window { Celestial: any; d3: any }
}
declare module '#app' { interface NuxtApp { $celestial: any } }
export {}