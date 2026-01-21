<script setup>
import { onMounted } from 'vue'
useHead({
    script: [
        {
            src: 'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js',
            async: false
        }
    ]
})

onMounted(() => {
    if (window.Trustpilot) {
        window.Trustpilot.loadFromElement(document.body, true)
    }
})

</script>
<template>
    <div class="trustpilot-widget" data-locale="en-US" data-template-id="53aa8912dec7e10d38f59f36"
        data-businessunit-id="5ff48289096c2900014598a7" data-style-height="140px" data-style-width="100%"
        data-token="42eb92ce-7043-444a-a237-7ef12436b14d" data-stars="1,2,3,4,5" data-review-languages="en">
        <a href="https://www.trustpilot.com/review/picturethestars.com" target="_blank" rel="noopener">Trustpilot</a>
    </div>
</template>
