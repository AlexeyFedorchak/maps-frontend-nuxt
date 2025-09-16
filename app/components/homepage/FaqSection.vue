<template>
  <section class="faq-section">
    <div class="container">
      
      <div class="header-content">
        <h2 class="main-title">THE SCIENCE ON HOW IT WORKS</h2>
        <p class="subtitle">Your most common questions answered</p>
      </div>

      <div class="content-grid">
        <div class="accordion-column">
          <Accordion 
            type="single" 
            class="w-full" 
            collapsible 
            :default-value="selectedItem"
            @update:model-value="updateSelectedItem"
          >
            <AccordionItem 
              v-for="item in faqItems" 
              :key="item.value" 
              :value="item.value"
              class="faq-accordion-item"
            >
              <AccordionTrigger class="faq-trigger">
                {{ item.question }}
              </AccordionTrigger>
              <AccordionContent class="faq-content-hidden">
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div class="content-column">
          <div class="content-card">
            <h3 class="content-title">{{ currentContent.title || currentContent.question }}</h3>
            <div class="content-text" v-html="currentContent.answer"></div>
            
            <div class="content-buttons">
              <button class="btn-outline">LEARN MORE</button>
              <button class="btn-primary">CREATE YOUR CUSTOM STAR MAP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"

const selectedItem = ref("item-1")

const faqItems = [
  {
    value: "item-1",
    question: "What is a Moon Map?",
    title: "What is a Star Map?",
    answer: `<p>A star map is the precise location of the stars on a specific time, as seen from any chosen location on Earth. Every star map/ sky map is calculated using multiple star data points and can be calculated far in the future and in the past. Our star maps are calculated to an incredible level of accuracy and detail to which we are unmatched.</p>
    <p>Historically used for navigation, storytelling, and celebration for thousands of years. From ancient Egyptians drawing sky charts on tomb ceilings around 1500 BCE to Babylonian star catalogs and Chinese and Polynesian navigators using celestial charts to cross oceans, star maps have played a big role in our past, and now used to honour life's most precious moments and celebrations. A moment marked in time and the stars.</p>
    <p>Our Star Maps are created with the vairables listed below Earths Orbit (date), Earths Axial Rotation (time), Geographical Coordinates (location), Celestial Coordinates (declination and right ascenesion), Star DataCatalogue (ESAs Hippacorus + Hippacampus, Tycho-2 Catalog, Yale University), Atronomical Database (Nebula, Milky way and Real Photo assets) Magnitude (Star brightness), Compass (Feature), Enhanced MilkyWay (Feature) More Space More Stars (Optimised for print size)</p>`
  },
  {
    value: "item-2", 
    question: "What is a Location Map?",
    answer: `<p>A location map captures the exact geographical coordinates and topographical details of a place that holds special meaning to you.</p>
    <p>Whether it's where you first met, got engaged, married, or any significant location, our maps preserve these precious places forever.</p>
    <p>Using precise GPS coordinates and detailed cartographic data, each location map shows the exact street layout, landmarks, and geographical features of your chosen place.</p>
    <p>Perfect for commemorating wedding venues, childhood homes, vacation destinations, or anywhere that holds sentimental value in your story.</p>`
  },
  {
    value: "item-3",
    question: "How is it a Personalised Gifts?",
    answer: `<p>Every map is completely customized to your specifications - from the date, time, and location, to the colors, text, and styling.</p>
    <p>Add personal messages, choose from multiple design themes, and select the perfect size and framing options to create a truly unique gift.</p>
    <p>Our personalization options include custom titles, special dates, meaningful quotes, and a wide range of color schemes to match any décor or personal preference.</p>`
  },
  {
    value: "item-4",
    question: "Why Choose Picture the Stars?",
    answer: `<p>We combine scientific accuracy with beautiful design, using premium materials and printing techniques.</p>
    <p>Our maps are created using professional astronomical databases and printed on museum-grade paper with archival inks for lasting quality.</p>
    <p>With over 50,000 satisfied customers, we're trusted for our attention to detail, fast shipping, and exceptional customer service.</p>`
  },
  {
    value: "item-5",
    question: "How Long does it take to arrive?",
    answer: `<p>Standard delivery takes 3-5 business days within the UK, with express options available.</p>
    <p>International shipping typically takes 7-14 business days. All orders are fully tracked and insured.</p>
    <p>Rush orders can be processed within 24 hours for special occasions, and we offer premium framing services with slightly longer delivery times.</p>`
  }
]

const currentContent = computed(() => {
  return faqItems.find(item => item.value === selectedItem.value) || faqItems[0]
})

const updateSelectedItem = (value) => {
  selectedItem.value = value
}
</script>

<style scoped>
.faq-section {
  padding: 80px 0;
  background-image: url('/images/faq-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.header-content {
  text-align: center;
  margin-bottom: 60px;
}

.main-title {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 44px;
  color: #1a1a1a;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.subtitle {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #666666;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
  min-height: 600px;
  padding: 0 40px;
}

.accordion-column {
}

.faq-accordion-item {
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  margin-bottom: 30px;
  height: 80px;
  background: white;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.faq-accordion-item[data-state="open"] {
  border-color: #d4a574;
}

:deep(.faq-trigger) {
  font-family: 'Lato', sans-serif !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  line-height: 125% !important;
  letter-spacing: 0% !important;
  color: #1a1a1a !important;
  padding: 16px 24px !important;
  text-align: left !important;
  justify-content: space-between !important;
  border: none !important;
  background: white !important;
  transition: all 0.2s ease;
  width: 100% !important;
  display: flex !important;
  align-items: center !important;
  height: 80px !important;
  text-decoration: none !important;
}

:deep(.faq-trigger[data-state="open"] svg) {
  transform: rotate(90deg) !important;
}

:deep(.faq-trigger svg) {
  transform: rotate(0deg) !important;
  transition: transform 0.3s ease !important;
}

:deep(.faq-trigger:hover) {
  background-color: #f8f9fa !important;
}

:deep(.faq-trigger[data-state="open"]) {
  background-color: #f1f5f9 !important;
  border-bottom: 1px solid #e2e8f0 !important;
}

.faq-content-hidden {
  display: none;
}

.content-column {
  position: relative;
}

.content-card {
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  height: 520px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-title {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #1a1a1a;
  margin-bottom: 24px;
}

.content-text {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #4a5568;
  margin-bottom: 40px;
  flex-grow: 1;
}

.content-text p {
  margin-bottom: 16px;
}

.content-text p:last-child {
  margin-bottom: 0;
}

.content-buttons {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.btn-outline {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #000000;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 50px;
  padding: 10px 24px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 140px;
  height: 40px;
}

.btn-outline:hover {
  background-color: #ffffff;
  color: #000000;
  border-color: #000000;
}

.btn-primary {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #000000;
  background: #f5f5f5;
  border: 2px solid #f5f5f5;
  border-radius: 50px;
  padding: 10px 24px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 180px;
  height: 40px;
}

.btn-primary:hover {
  background-color: #f5f5f5;
  color: #000000;
  border-color: #f5f5f5;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .accordion-column {
    position: static;
  }
  
  .content-card {
    padding: 24px;
  }
  
  .main-title {
    font-size: 28px;
    line-height: 36px;
  }
  
  .content-buttons {
    flex-direction: column;
  }
}
</style>