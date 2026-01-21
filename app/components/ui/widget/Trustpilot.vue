<script setup lang="ts">
const props = withDefaults(
    defineProps<{
      businessunitId?: string;
      templateId?: string;
      locale?: string;
      width?: string;
      height?: string;
      theme?: string;
      token?: string;
      stars?: string;
      reviewLanguages?: string;
      iframeStyles?: Record<string, string>;
    }>(),
    {
      businessunitId: '5ff48289096c2900014598a7',
      templateId: '5419b637fa0340045cd0c936',
      width: '100%',
      height: '26px',
      theme: 'default',
      locale: 'en-GB',
      token: '83536786-5c13-491b-a075-1be32cb554c2',
      stars: '1,2,3,4,5',
      reviewLanguages: 'en',
    },
);

const trustpilot = ref<HTMLElement | null>(null);

watch(trustpilot, () => {
  if (process.client && window.Trustpilot) {
    window.Trustpilot.loadFromElement(trustpilot.value);
  }
}, { once: true });

const getIframeSrc = computed(() => {
  return `https://widget.trustpilot.com/trustboxes/${props.templateId}/index.html?templateId=${props.templateId}&businessunitId=${props.businessunitId}#locale=${props.locale}&styleHeight=${props.height}&styleWidth=${props.width}&theme=${props.theme}`;
});

declare global {
  interface Window {
    Trustpilot: any;
  }
}
</script>

<template>
  <ClientOnly>
    <div class="trustpilot-widget relative inline-block max-w-[235px]"
         ref="trustpilot"
         :data-locale="props.locale"
         :data-template-id="props.templateId"
         :data-businessunit-id="props.businessunitId"
         :data-style-height="props.height"
         :data-style-width="props.width"
         :data-theme="props.theme"
         :data-token="props.token"
         :data-stars="props.stars"
         :data-review-languages="props.reviewLanguages">
      <slot>
        <iframe
            title="Customer reviews powered by Trustpilot"
            class="inline-block"
            :src="getIframeSrc"
            :style="iframeStyles"
        >
        </iframe>
      </slot>
    </div>
  </ClientOnly>
</template>

<style scoped>

</style>