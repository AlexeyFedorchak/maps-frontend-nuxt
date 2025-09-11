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
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.gifts-section {
  background-color: #ffffff;
  padding: 0 0 160px 0;
}

.separator-bar {
  height: 200px;
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
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  color: #1a1a1a;
  margin-bottom: 12px;
  text-align: center;
}

.gift-description {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #666666;
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

@media (max-width: 768px) {
  .gifts-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .gift-column {
    gap: 32px;
  }
  
  .main-title {
    font-size: 28px;
    line-height: 36px;
  }
  
  .container {
    padding: 0 20px;
  }
}

@media (max-width: 480px) {
  .separator-bar {
    height: 20px;
  }
  
  .header-content {
    margin-bottom: 60px;
  }
  
  .gift-icon {
    width: 50px;
    height: 50px;
  }
}
</style>