export default defineNuxtPlugin(() => {
    const script = document.createElement('script')
    script.src = 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'
    script.async = true
    document.head.appendChild(script)
});
