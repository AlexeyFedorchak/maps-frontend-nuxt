<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    if (window.Trustpilot) {
        window.Trustpilot.loadFromElement(document.body, true)
    }
})
</script>

<template>
    <div class="trustpilot-widget" data-locale="en-US" data-template-id="5406e65db0d04a09e042d5fc"
        data-businessunit-id="5ff48289096c2900014598a7" data-style-height="28px" data-style-width="100%"
        data-token="73f97ee6-dc00-4ff5-aa12-439145acae25">
        <a href="https://www.trustpilot.com/review/picturethestars.com" target="_blank" rel="noopener">Trustpilot</a>
    </div>
</template>
