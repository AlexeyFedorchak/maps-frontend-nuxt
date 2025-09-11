<template>
  <ul>
    <li><NuxtLink to="/product/location-map">Location map</NuxtLink></li>
    <li><NuxtLink to="/product/star-map">Star map</NuxtLink></li>
    <li><NuxtLink to="/checkout">checkout</NuxtLink></li>
  </ul>

</template>

<script setup>
</script>

<style scoped>
.mode-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  gap: var(--spacing-sm);
  background: var(--color-white);
  padding: var(--spacing-sm);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
}

.mode-btn {
  padding: var(--spacing-xs) var(--spacing-md);
  border: 2px solid var(--color-gray-300);
  background: var(--color-white);
  color: var(--color-gray-700);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-fast);
}

.mode-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.mode-btn.active {
  background: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);
}

.vue-app {
  padding: 2rem;
  background: var(--color-background);
  min-height: 100vh;
  font-family: var(--font-family-primary);
}

.test-styles {
  background: var(--color-white);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  margin: var(--spacing-lg) 0;
  box-shadow: var(--shadow-sm);
}

.test-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-lg);
  color: var(--color-black);
}

.test-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.test-section h3 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-md);
  color: var(--color-primary);
}

.btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  transition: var(--transition-base);
}

.btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.info-box {
  background: #e6f3ff;
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  border-left: 4px solid var(--color-info);
}

.info-box h2 {
  color: var(--color-info);
  margin-bottom: var(--spacing-md);
}

.info-box ul {
  list-style: none;
  padding: 0;
}

.info-box li {
  padding: var(--spacing-xs) 0;
  font-weight: var(--font-weight-medium);
}

.layout-test-content {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
  padding: var(--spacing-lg);
  text-align: center;
}

.controls-test {
  padding: var(--spacing-lg);
  background: var(--color-gray-50);
  border-radius: var(--border-radius-md);
}

.step-controls {
  margin: var(--spacing-lg) 0;
  display: flex;
  gap: var(--spacing-md);
}

.step-controls button {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: var(--transition-fast);
}

.step-controls button:disabled {
  background: var(--color-gray-300);
  cursor: not-allowed;
}

.location-test {
  margin-top: var(--spacing-lg);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-gray-300);
}

.location-test button {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--color-success);
  color: var(--color-white);
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
}

.frames-test {
  padding: 2rem;
  background: var(--color-background);
  min-height: 100vh;
}

.frames-title {
  text-align: center;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-black);
  margin-bottom: var(--spacing-xl);
}

.frames-controls {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.frames-controls label {
  font-weight: var(--font-weight-semibold);
  margin-right: var(--spacing-md);
}

.frames-controls select {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-gray-300);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-base);
}

.frame-demo {
  position: relative;
  height: 80vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: var(--border-radius-md);
  overflow: hidden;
}

.frame-info {
  text-align: center;
  margin-top: var(--spacing-lg);
  background: var(--color-white);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
}
</style>
