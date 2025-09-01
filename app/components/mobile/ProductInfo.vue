<template>
  <div class="mobile-product-info">
    <div class="product-features">
      <div class="feature-item">
        <img src="/images/icons/infinity.svg" alt="Lifetime Warranty" class="feature-icon">
        <span class="feature-text">Lifetime Warranty</span>
      </div>
      <div class="feature-item">
        <img src="/images/icons/hd.svg" alt="Ultra HD Prints" class="feature-icon">
        <span class="feature-text">Ultra HD Prints</span>
      </div>
      <div class="feature-item">
        <img src="/images/icons/milky-way.svg" alt="Milky Way +" class="feature-icon">
        <span class="feature-text">Milky Way +</span>
      </div>
    </div>
    
    <div class="price-info">
      <div class="total-price">
        <span class="price-amount">Total £{{ totalPrice }}</span>
        <span class="free-shipping">Free Shipping included</span>
      </div>
      <div class="payment-info">
        <span class="payment-text">or Pay in 3 interest free payments for £{{ installmentPrice }}</span>
        <img src="/images/icons/info.svg" alt="info" class="info-icon">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  totalPrice: string
  installmentPrice: string
}

const props = defineProps<Props>()
</script>

<style scoped>
.mobile-product-info {
  background: rgba(247, 247, 247, 0.95);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid #e5e7eb;
}

.product-features {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 16px;
  height: 16px;
}

.feature-text {
  font-size: 12px;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

.price-info {
  text-align: center;
}

.total-price {
  margin-bottom: 8px;
}

.price-amount {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-right: 8px;
}

.free-shipping {
  font-size: 14px;
  color: #666;
}

.payment-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.payment-text {
  font-size: 12px;
  color: #999;
}

.info-icon {
  width: 14px;
  height: 14px;
}

@media (max-width: 480px) {
  .mobile-product-info {
    padding: 12px;
    margin-bottom: 16px;
  }
  
  .product-features {
    gap: 8px;
  }
  
  .feature-item {
    padding: 6px 8px;
  }
  
  .feature-text {
    font-size: 10px;
  }
  
  .price-amount {
    font-size: 16px;
  }
  
  .free-shipping {
    font-size: 12px;
  }
  
  .payment-text {
    font-size: 10px;
  }
}
</style>
