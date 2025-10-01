<script setup lang="ts">
import { useBasketStore } from '~/stores/basketStore';
import type { BasketItem, BasketRecommendation, Frame } from '~/types/index';

const basketStore = useBasketStore();
basketStore.loadBasket();

const undoItem = ref(null<BasketItem>);

function editItem(item: BasketItem) {
  const validSlugs = ['star-map', 'location-map'];
  basketStore.setEditingItem(item);
  const slug = validSlugs.includes(item.slug) ? item.slug : 'star-map';

  navigateTo(`/product/${slug}`);
}
onMounted(async () => {
  await basketStore.calculatePricesFromApi();
});

function removeItem(item: BasketItem) {
  undoItem.value = item;
  basketStore.removeItemFromBasket(item);
}

function addUndoItem() {
  if (undoItem.value) {
    const item = undoItem.value;
    basketStore.addPosterToBasket({
      id: item.id,
      title: item.title,
      mapTitle: item.mapTitle,
      slug: item.slug,
      location: item.location,
      date: item.date,
      time: item.time,
      selectedSize: item.selectedSize,
      price: item.price,
      frame: item.frame,
      hasRibbon: item.hasRibbon,
      theme: item.theme,
      layout: item.layout,
    });
    undoItem.value = null;
  }
}

async function addExtra(item: BasketRecommendation, uuid: string) {
  await basketStore.addRecommendation(uuid, item);
  basketStore.saveBasket();
}

async function removeExtra(item: BasketRecommendation, uuid: string) {
  await basketStore.removeRecommendation(uuid, item);
  basketStore.saveBasket();
}

async function setFrame(frame: Frame | null, uuid: string) {
  basketStore.updateItemFrame(uuid, frame);
  basketStore.saveBasket();
  await basketStore.calculatePricesFromApi();
}

async function selectRibbon(ribbon: boolean, uuid: string) {
  basketStore.updateItemRibbon(uuid, ribbon);
  basketStore.saveBasket();
  await basketStore.calculatePricesFromApi();
}

</script>

<template>
  <UiLayoutHeader />
  <div class="max-w-5xl mx-auto px-4 py-8">
    <div v-if="basketStore.priceError" class="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
      {{ basketStore.priceError }}
    </div>
    <div v-if="undoItem" class="-mt-8 py-4 px-14 mb-1 border-t-[2px] border-t-[#8fae1b]">
      “{{ undoItem?.title }}” removed. <span @click="addUndoItem" class="underline cursor-pointer">Undo?</span>
    </div>
    <h1 class="hidden md:block text-center text-xl font-bold tracking-wide mb-6">YOUR BASKET</h1>
    <CheckoutCard
      v-for="item of basketStore.items"
      :key="item.id"
      :title="item.title"
      :location="item.location"
      :date="item.date"
      :selected-size="item.selectedSize"
      :price="item.price"
      :total-price="basketStore.itemTotals[item.id] || item.price"
      :preview-uri="item.previewUri"
      :has-ribbon="item.hasRibbon"
      :frame="item.frame"
      @edit="editItem(item)"
      @remove="removeItem(item)"
    >
      <!-- Desktop: full extras -->
      <template #extras>
        <CheckoutCardExtras
          :item-id="item.id"
          :item-uuid="item.uuid"
          :basic-recommendations="item.basicRecommendations"
          :advanced-recommendations="item.advancedRecommendations"
          :item-frame="item.frame"
          :item-ribbon="item.hasRibbon"
          :selected-extras="item.selectedExtras"
          :selected-size="item.selectedSize"
          mode="all"
          @add="addExtra"
          @remove="removeExtra"
          @set-frame="setFrame"
          @select-ribbon="selectRibbon"
        />
      </template>

      <!-- Mobile: added extras inside card -->
      <template #extras-added-mobile>
        <CheckoutCardExtras
          :item-id="item.id"
          :item-uuid="item.uuid"
          :basic-recommendations="item.basicRecommendations"
          :advanced-recommendations="item.advancedRecommendations"
          :item-frame="item.frame"
          :item-ribbon="item.hasRibbon"
          :selected-extras="item.selectedExtras"
          :selected-size="item.selectedSize"
          mode="added-only"
          @add="addExtra"
          @remove="removeExtra"
          @set-frame="setFrame"
          @select-ribbon="selectRibbon"
        />
      </template>

      <!-- Mobile: recommendations below card -->
      <template #extras-recommendations-mobile>
        <CheckoutCardExtras
          :item-id="item.id"
          :item-uuid="item.uuid"
          :basic-recommendations="item.basicRecommendations"
          :advanced-recommendations="item.advancedRecommendations"
          :item-frame="item.frame"
          :item-ribbon="item.hasRibbon"
          :selected-extras="item.selectedExtras"
          :selected-size="item.selectedSize"
          mode="recommendations-only"
          @add="addExtra"
          @remove="removeExtra"
          @set-frame="setFrame"
          @select-ribbon="selectRibbon"
        />
      </template>
    </CheckoutCard>
  </div>

  <div class="bg-[#F7F7F7]">
    <div class="max-w-5xl mx-auto px-4 py-8">
      <PopularSection />
    </div>
  </div>

  <CheckoutOrder />

</template>

<style scoped>

</style>
