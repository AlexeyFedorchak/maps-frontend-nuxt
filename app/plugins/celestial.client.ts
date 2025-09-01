export default defineNuxtPlugin(async () => {
    if (import.meta.server) return  // двойная защита

    const load = (src: string) =>
        new Promise<void>((res, rej) => {
            const s = document.createElement('script')
            s.src = src
            s.defer = true   // сохраняем порядок
            s.onload = () => res()
            s.onerror = rej
            document.head.appendChild(s)
        })

    await load('/js/d3.js')
    await load('/js/d3.geo.projection.js')
    await load('/js/celestial.js')
})
