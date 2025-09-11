<template>
  <section 
    class="features-section"
    style="background-image: url('/images/black-background')"
  >
    <div class="container">
      <div class="text-center mb-12">
        <p class="subtitle">
          Picture the Stars & more with us
        </p>
        
        <h2 class="main-title">
          THE HIGHEST FINE ART PRODUCTS
        </h2>
        
        <p class="description">
          Perfected over many years your picture the stars custom star map is a bespoke work of art.<br>
          Capture your special moment in the stars forever.
        </p>
      </div>

      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/UHD.png" alt="Ultra HD Print" />
          </div>
          <h3 class="feature-title">Ultra HD Print</h3>
          <p class="feature-description">
            Finest Art Giclée<br>
            Ultra high detail
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/Milky Way+.png" alt="Milky Way+" />
          </div>
          <h3 class="feature-title">Milky Way+</h3>
          <p class="feature-description">
            Enhanced photo<br>
            Remastered detail
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/Award Winning.png" alt="Award Winning" />
          </div>
          <h3 class="feature-title">Award Winning</h3>
          <p class="feature-description">
            Canon Printer Awards<br>
            superior colour gamut
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/Museum Grade.png" alt="Museum Grade" />
          </div>
          <h3 class="feature-title">Museum Grade</h3>
          <p class="feature-description">
            285gsm Art Cardstock<br>
            prints to last a lifetime
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/telescope.png" alt="Verified Accuracy" />
          </div>
          <h3 class="feature-title">Verified Accuracy</h3>
          <p class="feature-description">
            Joint star catalogues<br>
            avoid cheap fakes
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/Constellations.png" alt="Constellations" />
          </div>
          <h3 class="feature-title">Constellations</h3>
          <p class="feature-description">
            And more features<br>
            compass, border
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/info-frame.png" alt="Premium Framing" />
          </div>
          <h3 class="feature-title">Premium Framing</h3>
          <p class="feature-description">
            Full Framing Service<br>
            and red gift ribbon
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/delivery.png" alt="Fast Free Shipping" />
          </div>
          <h3 class="feature-title">Fast Free Shipping</h3>
          <p class="feature-description">
            1-2 day fully tracked<br>
            Fully tracked notifications
          </p>
        </div>
      </div>

      <div class="cta-section">
        <button class="cta-button">
          CREATE YOUR STAR MAP
        </button>
        
        <p class="made-with">
          MADE WITH <img src="/images/noto_heart-suit.png" alt="♥" class="heart-icon" /> IN THE UK
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.features-section {
  background-color: #1a1a1a;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 80px 0;
  color: white;
}

.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2px;
}

.subtitle {
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0%;
  color: #a3a3a3;
  margin-bottom: 16px;
}

.main-title {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 48px;
  line-height: 56px;
  color: #ffffff;
  margin-bottom: 24px;
  text-align: center;
}

.description {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 28px;
  color: #a3a3a3;
  max-width: 900px;
  margin: 0 auto 80px auto;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 80px;
  margin-bottom: 80px;
  margin-left: -52px;
  padding: 0 80px 0 0;
}

.feature-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 12px;
}

.feature-icon {
  margin-bottom: 24px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon img {
  max-width: 80px;
  max-height: 80px;
  object-fit: contain;
}

.feature-title {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  margin-bottom: 8px;
  text-align: center;
  white-space: nowrap;
}

.feature-description {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  color: #a3a3a3;
  text-align: center;
  white-space: nowrap;
}

.cta-section {
  text-align: center;
}

.cta-button {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  background-color: #ffffff;
  border: none;
  border-radius: 50px;
  padding: 16px 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.cta-button:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
}

.made-with {
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  font-size: 14px;
  color: #a3a3a3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.heart-icon {
  width: 16px;
  height: 16px;
  display: inline-block;
}

@media (max-width: 1200px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 36px;
    line-height: 44px;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 16px;
  }
}

@media (max-width: 480px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>