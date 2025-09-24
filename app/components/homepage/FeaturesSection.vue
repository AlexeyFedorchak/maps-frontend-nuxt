<template>
  <section 
    class="features-section"
    style="background-image: url('/images/black-background')"
  >
    <div>
      <div class="hidden md:block text-center mb-12">
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
      
      <div class="block md:hidden text-center mb-8 px-8">
        <div class="max-w-sm mx-auto">
          <p class="font-lato font-medium text-sm text-gray-400 mb-3">
            Picture the Stars & more with us
          </p>
          
          <h2 class="font-lato font-bold text-2xl text-white mb-4 leading-tight">
            THE HIGHEST FINE ART PRODUCTS
          </h2>
          
          <p class="font-lato text-sm text-white-400 leading-relaxed">
            Perfected over many years your picture the stars custom star map is a bespoke work of art.
            Capture your special moment in the stars forever.
          </p>
        </div>
      </div>

      <div class="features-grid">
        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/icons/UHD.svg" alt="Ultra HD Print" />
          </div>
          <h3 class="feature-title">Ultra HD Print</h3>
          <p class="feature-description">
            Finest Art Giclée<br>
            Ultra high detail
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/icons/milky-way.svg" alt="Milky Way+" />
          </div>
          <h3 class="feature-title">Milky Way+</h3>
          <p class="feature-description">
            Enhanced photo<br>
            Remastered detail
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/icons/award-winning.svg" alt="Award Winning" />
          </div>
          <h3 class="feature-title">Award Winning</h3>
          <p class="feature-description">
            Canon Printer Awards<br>
            superior colour gamut
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/icons/museum-grade.svg" alt="Museum Grade" />
          </div>
          <h3 class="feature-title">Museum Grade</h3>
          <p class="feature-description">
            285gsm Art Cardstock<br>
            prints to last a lifetime
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/icons/telescope.svg" alt="Verified Accuracy" />
          </div>
          <h3 class="feature-title">Verified Accuracy</h3>
          <p class="feature-description">
            Joint star catalogues<br>
            avoid cheap fakes
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/icons/constellations.svg" alt="Constellations" />
          </div>
          <h3 class="feature-title">Constellations</h3>
          <p class="feature-description">
            And more features<br>
            compass, border
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/icons/frame.svg" alt="Premium Framing" />
          </div>
          <h3 class="feature-title">Premium Framing</h3>
          <p class="feature-description">
            Full Framing Service<br>
            and red gift ribbon
          </p>
        </div>

        <div class="feature-item">
          <div class="feature-icon">
            <img src="/images/icons/delivery.svg" alt="Fast Free Shipping" />
          </div>
          <h3 class="feature-title">Fast Free Shipping</h3>
          <p class="feature-description">
            1-2 day fully tracked<br>
            Fully tracked notifications
          </p>
        </div>
      </div>


      <div class="block cta-section">
        <button class="cta-button uppercase">
          CREATE YOUR STAR MAP
        </button>

        <p class="made-with">
          MADE WITH <img src="/images/noto_heart-suit.png" alt="Heart" class="heart-icon" /> IN THE UK
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.features-section {
  background-color: #1C1E21;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 80px 0;
  color: white;
}

.subtitle {
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: 0%;
  color: #a3a3a3;
}

.main-title {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-style: extrabold;
  font-size: 24px;
  line-height: 125%;
  letter-spacing: 2.4px;
  color: #ffffff;
  margin-top: 10px;
  margin-bottom: 32px;
  text-align: center;
}

.description {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 18px;
  line-height: 28px;
  color: #ffffff;
  max-width: 900px;
  margin: 0 auto 80px auto;
  text-align: center;
}

.features-grid {
  margin: 0 10%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 28px;
  justify-content: center;
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
  margin-top: 60px;
}

.cta-button {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #000000;
  line-height: 125%;
  letter-spacing: 1px;
  background-color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 16px 32px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.cta-button:hover {
  background-color: #f5f5f5;
}

.made-with {
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 125%;
  letter-spacing: 1px;
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

@media (max-width: 1800px) {
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