<template>
  <section class="gifts-section">
    <div class="separator-bar"></div>
    
    <div class="container">
      <div class="header-content">
        <h2 class="main-title">PERSONALISED GIFTS SAY IT BEST</h2>
        <p class="subtitle">No matter what the occassion</p>
      </div>

      <div class="gifts-grid">
        <div class="gift-column">
          <div class="gift-item">
            <img src="/images/couples.png" alt="For Couples" class="gift-icon" />
            <h3 class="gift-title">For Couples</h3>
            <p class="gift-description">
              The night sky when you first met,<br>
              a first date, a first kiss, under the stars,<br>
              or a Star map for awedding/anniversary.
            </p>
          </div>

          <div class="gift-item">
            <img src="/images/gift.png" alt="House Warming Gift" class="gift-icon" />
            <h3 class="gift-title">House Warming Gift</h3>
            <p class="gift-description">
              We think our customizable star maps are<br>
              truly the best house warming present for<br>
              your loved ones.
            </p>
          </div>

          <div class="gift-item">
            <img src="/images/cat.png" alt="Personalised Pet Gifts" class="gift-icon" />
            <h3 class="gift-title">Personalised Pet Gifts</h3>
            <p class="gift-description">
              Looking for a personalised pet gift?<br>
              One of our star/moon maps are the perfect<br>
              piece to remember them forever.
            </p>
          </div>
        </div>

        <div class="gift-column">
          <div class="gift-item">
            <img src="/images/cake.png" alt="For Birthdays" class="gift-icon" />
            <h3 class="gift-title">For Birthdays</h3>
            <p class="gift-description">
              A star map for a first birthday<br>
              or a hundredth, a sky map for the birth of a<br>
              special baby star. The perfect birthday gift.
            </p>
          </div>

          <div class="gift-item">
            <img src="/images/church.png" alt="Wedding Gifts" class="gift-icon" />
            <h3 class="gift-title">Wedding Gifts</h3>
            <p class="gift-description">
              Friend or family member getting married?<br>
              Give them the gift they'll never forget with<br>
              our personalised star and moon maps.
            </p>
          </div>

          <div class="gift-item">
            <img src="/images/rings.png" alt="Anniversaries" class="gift-icon" />
            <h3 class="gift-title">Anniversaries</h3>
            <p class="gift-description">
              Capture the exact location of the stars<br>
              on your special day and frame them for<br>
              the perfect anniversary gift.
            </p>
          </div>
        </div>

        <div class="gift-column">
          <div class="gift-item">
            <img src="/images/ballons.png" alt="Special Occasions" class="gift-icon" />
            <h3 class="gift-title">Special Occasions</h3>
            <p class="gift-description">
              A custom night sky map for any special<br>
              occasion. A moment to remember forever<br>
              in the stars.
            </p>
          </div>

          <div class="gift-item">
            <img src="/images/archery_bow.png" alt="Valentines Day" class="gift-icon" />
            <h3 class="gift-title">Valentines Day</h3>
            <p class="gift-description">
              Looking for a Unique & Thoughtful gift?<br>
              Purchase a personalised star map.<br>
              This is the perfect Valentine's Day gift.
            </p>
          </div>

          <div class="gift-item">
            <img src="/images/tree.png" alt="Christmas Gift" class="gift-icon" />
            <h3 class="gift-title">Christmas Gift</h3>
            <p class="gift-description">
              The perfect Christmas gift?<br>
              create an xmas star map<br>
              A personalised picture of the stars.
            </p>
          </div>
        </div>

        <div class="gift-column">
          <div class="gift-item">
            <img src="/images/mother_day.png" alt="Mothers Day" class="gift-icon" />
            <h3 class="gift-title">Mothers Day</h3>
            <p class="gift-description">
              What is the best gift for mum this year?<br>
              Look no further than our range of fully<br>
              customizable star and moon maps.
            </p>
          </div>

          <div class="gift-item">
            <img src="/images/fathers_day.png" alt="Fathers Day" class="gift-icon" />
            <h3 class="gift-title">Fathers Day</h3>
            <p class="gift-description">
              Bored of the same old gifts for fathers day?<br>
              Try something different this year with one<br>
              of our star maps.
            </p>
          </div>

          <div class="gift-item">
            <img src="/images/bird.png" alt="Remembrance" class="gift-icon" />
            <h3 class="gift-title">Remembrance</h3>
            <p class="gift-description">
              Our star and moon maps are the best<br>
              gifts to remember a passed loved one.<br>
              Forever in our hearts and the stars.
            </p>
          </div>
        </div>
      </div>

      <div class="gifts-accordion mobile-only">
        <div 
          v-for="(item, index) in giftItems" 
          :key="index"
          class="accordion-item"
          :class="{ active: activeAccordion === index }"
        >
          <button 
            @click="toggleAccordion(index)"
            class="accordion-header"
          >
            <div class="accordion-header-content">
              <img :src="item.icon" :alt="item.title" class="accordion-icon" />
              <span class="accordion-title">{{ item.title }}</span>
            </div>
            <svg 
              class="accordion-arrow" 
              :class="{ rotated: activeAccordion === index }"
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <div 
            class="accordion-content"
            :class="{ expanded: activeAccordion === index }"
          >
            <div class="accordion-content-inner">
              <p class="accordion-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeAccordion = ref(0)

const giftItems = [
  {
    title: 'For Couples',
    icon: '/images/couples.png',
    description: 'The night sky when you first met, a first date, a first kiss, under the stars, or a Star map for awedding/anniversary.'
  },
  {
    title: 'For Birthdays',
    icon: '/images/cake.png',
    description: 'A star map for a first birthday or a hundredth, a sky map for the birth of a special baby star. The perfect birthday gift.'
  },
  {
    title: 'Special Occasions',
    icon: '/images/ballons.png',
    description: 'A custom night sky map for any special occasion. A moment to remember forever in the stars.'
  },
  {
    title: 'Mothers Day',
    icon: '/images/mother_day.png',
    description: 'What is the best gift for mum this year? Look no further than our range of fully customizable star and moon maps.'
  },
  {
    title: 'House Warming Gift',
    icon: '/images/gift.png',
    description: 'We think our customizable star maps are truly the best house warming present for your loved ones.'
  },
  {
    title: 'Wedding Gifts',
    icon: '/images/church.png',
    description: 'Friend or family member getting married? Give them the gift they\'ll never forget with our personalised star and moon maps.'
  },
  {
    title: 'Valentines Day',
    icon: '/images/archery_bow.png',
    description: 'Looking for a Unique & Thoughtful gift? Purchase a personalised star map. This is the perfect Valentine\'s Day gift.'
  },
  {
    title: 'Fathers Day',
    icon: '/images/fathers_day.png',
    description: 'Bored of the same old gifts for fathers day? Try something different this year with one of our star maps.'
  },
  {
    title: 'Personalised Pet Gifts',
    icon: '/images/cat.png',
    description: 'Looking for a personalised pet gift? One of our star/moon maps are the perfect piece to remember them forever.'
  },
  {
    title: 'Anniversaries',
    icon: '/images/rings.png',
    description: 'Capture the exact location of the stars on your special day and frame them for the perfect anniversary gift.'
  },
  {
    title: 'Christmas Gift',
    icon: '/images/tree.png',
    description: 'The perfect Christmas gift? create an xmas star map A personalised picture of the stars.'
  },
  {
    title: 'Remembrance',
    icon: '/images/bird.png',
    description: 'Our star and moon maps are the best gifts to remember a passed loved one. Forever in our hearts and the stars.'
  }
]

const toggleAccordion = (index) => {
  activeAccordion.value = activeAccordion.value === index ? -1 : index
}
</script>

<style scoped>
.gifts-section {
  background-color: #ffffff;
  padding: 0 0 160px 0;
}

.separator-bar {
  height: 120px;
  background-color: #ffffff;
  width: 100%;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.header-content {
  text-align: center;
  margin-bottom: 80px;
}

.main-title {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-style: extrabold;
  font-size: 24px;
  line-height: 125%;
  color: #1a1a1a;
  margin-bottom: 16px;
  text-transform: uppercase;
  letter-spacing: 2.4px;
}

.subtitle {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #666666;
}

.gifts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 60px;
}

.gift-column {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.gift-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gift-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 20px;
  object-fit: contain;
}

.gift-title {
  font-family: 'Lato', sans-serif;
  font-weight: 800;
  font-size: 20px;
  line-height: 135%;
  color: #1a1a1a;
  margin-bottom: 12px;
  text-align: center;
}

.gift-description {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #787878;
  text-align: center;
  max-width: 280px;
}

@media (max-width: 1024px) {
  .gifts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
  
  .gift-column {
    gap: 40px;
  }
}

@media (min-width: 769px) {
  .mobile-only {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .gifts-grid {
    display: none;
  }
  
  .mobile-only {
    display: block;
  }
  
  .gifts-section {
    padding: 0 0 80px 0;
  }
  
  .separator-bar {
    height: 120px;
  }
  
  .main-title {
    font-size: 28px;
    line-height: 36px;
  }
  
  .container {
    padding: 60px 20px 0 20px;
  }
}

.mobile-only {
  display: none;
}

.gifts-accordion {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.accordion-item {
  border: 1px solid #e0e0e0;
  border-radius: 16px;
  background: #ffffff;
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  padding: 20px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s ease;
}

.accordion-header:hover {
  background-color: #f8f9fa;
}

.accordion-header-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.accordion-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  flex-shrink: 0;
}

.accordion-title {
  font-family: 'Lato', sans-serif;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #1a1a1a;
}

.accordion-arrow {
  color: #666666;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.accordion-arrow.rotated {
  transform: rotate(180deg);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-content.expanded {
  max-height: 200px;
}

.accordion-content-inner {
  padding: 0 16px 20px 52px;
}

.accordion-description {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #666666;
  margin: 0;
}

@media (max-width: 480px) {
  .gifts-section {
    padding: 0 0 60px 0;
  }
  
  .separator-bar {
    height: 80px;
  }
  
  .header-content {
    margin-bottom: 40px;
  }
  
  .main-title {
    font-size: 24px;
    line-height: 32px;
  }
  
  .subtitle {
    font-size: 16px;
  }
  
  .accordion-header {
    padding: 16px 12px;
  }
  
  .accordion-content-inner {
    padding: 0 12px 16px 48px;
  }
  
  .accordion-icon {
    width: 20px;
    height: 20px;
  }
  
  .accordion-title {
    font-size: 16px;
  }
  
  .accordion-description {
    font-size: 13px;
    line-height: 18px;
  }
}
</style>