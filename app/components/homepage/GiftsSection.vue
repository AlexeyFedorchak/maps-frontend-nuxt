<template>
  <section class="gifts-section">
    <div class="container">
      <div class="gifts-grid">
        <div class="gift-item">
          <div class="gift-image">
            <img src="/images/gift_1.png" alt="Unbox the Memories" />
          </div>
          <div class="gift-content">
            <h3 class="gift-title">UNBOX THE MEMORIES</h3>
            <p class="gift-description">
            The unboxing of a cherished memory, a gift that lasts a<br>
              lifetime
          </p>
          </div>
        </div>

        <div class="gift-item gift-item-2">
          <div class="gift-image">
            <img src="/images/gift_2.png" alt="Wear the Moment Forever" class="gift-2-img" />
          </div>
          <div class="gift-content">
            <h3 class="gift-title">WEAR THE MOMENT FOREVER</h3>
            <p class="gift-description">
            The stars engraved on Gold, Silver or Steel. The extra special<br>
              keepsake
          </p>
          </div>
        </div>

        <div class="gift-item gift-item-3">
          <div class="gift-image">
            <img src="/images/gift_3.png" alt="Frame Your Creation" class="gift-3-img" />
          </div>
          <div class="gift-content">
            <h3 class="gift-title">FRAME YOUR CREATION</h3>
            <p class="gift-description">
            Wooden Picture Frames and Gift Ribbon. Full<br>
              service
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
  height: 100vh;
  background-color: #ffffff;
}

.container {
  width: 100%;
  height: 100%;
  padding: 0;
  max-width: none;
}

.gifts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height: 100%;
  gap: 0;
}

.gift-item {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.gift-image {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.gift-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gift-item:hover .gift-image img {
  transform: scale(1.05);
}

.gift-content {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-align: center;
  width: 90%;
}

.gift-title {
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 32px;
  color: #ffffff;
  margin-bottom: 12px;
  text-transform: uppercase;
}

.gift-description {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #ffffff;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .gifts-grid {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
  
  .gifts-section {
    height: 300vh;
  }
  
  .gift-content {
    bottom: 40px;
  }
  
  .gift-item:hover .gift-image img {
    transform: scale(1) !important;
  }
  
  .gift-2-img {
    object-fit: contain;
    object-position: 20% 80%;
    transform: scale(1);
  }
  
  .gift-3-img {
    object-fit: contain;
    object-position: center center;
  }
  
  .gift-item:hover .gift-2-img {
    transform: scale(1) !important;
  }
  
  .gift-item:hover .gift-3-img {
    transform: scale(1) !important;
  }
}

@media (max-width: 480px) {
  .gift-content {
    padding: 40px 16px 16px 16px;
  }
  
  .gift-title {
    font-size: 18px;
  }
  
  .gift-description {
    font-size: 13px;
  }
}
</style>