<template>
    <AppHeader />
    <HeroSection />
    <ProductsSection />
    <TrustpilotSection />
    <NewsletterSection />
    <FeaturesSection />
    <GiftsSection />
    <FaqSection class="hidden md:block" />
    <MomentSection />
    <PersonalisedGiftsSection />
    <NewsletterSection />
    <FooterSection />
</template>

<script setup>
import AppHeader from '~/components/layout/AppHeader.vue'
import HeroSection from '~/components/homepage/HeroSection.vue';
import ProductsSection from '~/components/homepage/ProductsSection.vue';
import TrustpilotSection from '~/components/homepage/TrustpilotSection.vue';
import NewsletterSection from '~/components/homepage/NewsletterSection.vue';
import FeaturesSection from '~/components/homepage/FeaturesSection.vue';
import GiftsSection from '~/components/homepage/GiftsSection.vue';
import FaqSection from '~/components/homepage/FaqSection.vue';
import MomentSection from '~/components/homepage/MomentSection.vue';
import PersonalisedGiftsSection from '~/components/homepage/PersonalisedGiftsSection.vue';
import FooterSection from '~/components/homepage/FooterSection.vue';
</script>