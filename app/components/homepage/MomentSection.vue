<template>
  <section class="moment-section">
    <div class="container">
      <div class="content-grid">
        <div class="text-column">
          <h2 class="main-title">
            WHAT MOMENT WILL<br>
            YOU CAPTURE?
          </h2>
          
          <div class="description-text">
            <p>
              Turn your most meaningful memories into a timeless star map.<br>
              The perfect gift, keepsake, or bespoke print/jewellery crafted to<br>
              celebrate life's moments that matter most.
            </p>
            
            <p>
              Preview your design instantly with our easy-to-use live builder.
            </p>
          </div>
          
          <button class="cta-button">
            CREATE STAR MAP
          </button>
        </div>

        <div class="image-column">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.moment-section {
  background-image: url('/images/moon-background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 80px 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  min-height: 600px;
}

.text-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 40px;
}

.main-title {
  font-family: 'Lato', sans-serif;
  font-weight: bold;
  font-size: 48px;
  line-height: 125%;
  color: #1a1a1a;
  margin-bottom: 32px;
  text-transform: uppercase;
  letter-spacing: 2.4px;
}

.description-text {
  margin-bottom: 40px;
}

.description-text p {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: normal;
  font-size: 20px;
  line-height: 135%;
  color: #000000;
  margin-bottom: 20px;
}

.description-text p:last-child {
  margin-bottom: 0;
}

.cta-button {
  font-family: 'Lato', sans-serif;
  font-weight: 800;
  font-size: 18px;
  color: #000000;
  background-color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 20px 48px;
  cursor: pointer;
  line-height: 125%;
  text-transform: uppercase;
  letter-spacing: 1px;
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 308px;
  height: 70px;
}

.image-column {
}

@media (max-width: 768px) {
  .moment-section {
    background-image: url('/images/moon-background.png');
    background-color: #E1E0DE;
    background-position: center 120%;
    background-size: 300% 80%;
    overflow: hidden;
    position: relative;
  }
  
  .container {
    position: relative;
    z-index: 2;
  }
  .content-grid {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
  
  .text-column {
    padding-right: 0;
    order: 2;
    transform: translateY(-300px);
    position: relative;
    z-index: 10;
  }
  
  .image-column {
    order: 1;
  }
  
  .main-title {
    font-size: 36px;
    line-height: 44px;
  }
  
  .star-map-frame {
    max-width: 400px;
    height: 500px;
  }
  
  .cta-button {
    align-self: center;
  }
}

@media (max-width: 480px) {
  .moment-section {
    padding: 60px 0;
  }
  
  .container {
    padding: 0 20px;
  }
  
  .main-title {
    font-size: 28px;
    line-height: 36px;
  }
  
  .description-text p {
    font-size: 16px;
    line-height: 24px;
  }
}
</style>