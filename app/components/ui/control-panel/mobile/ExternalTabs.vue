<script setup lang="ts">
import { CONTROL_PANEL_TAB, useControlPanelStore } from '~/stores';

const controlPanelStore = useControlPanelStore();
</script>

<template>
  <div class="md:hidden">
    <div class="mobile-navigation-overlay">
      <!-- mobile Logo -->
      <div class="mobile-logo">
        <img src="/images/logo.svg" alt="Logo">
      </div>
    </div>

    <div class="mobile-nav-tabs">
      <ul class="nav nav-tabs nav-tab-icons flex" role="tablist">
        <li class="nav-item" role="presentation">
          <div
              class="nav-link"
              :class="{ active: controlPanelStore.activeTab === CONTROL_PANEL_TAB.TAB_1 }"
              @click="() => controlPanelStore.setActiveTab(CONTROL_PANEL_TAB.TAB_1)"
              role="tab"
          >
            <slot name="tab-1">
              <img src="/images/icons/print.svg" alt="print">
              <div class="block">
                <p class="m-0 font-extrabold black">PRINT</p>
              </div>
            </slot>
          </div>
        </li>
        <li class="nav-item" role="presentation">
          <div
              class="nav-link"
              :class="{ active: controlPanelStore.activeTab === CONTROL_PANEL_TAB.TAB_2 }"
              @click="controlPanelStore.setActiveTab(CONTROL_PANEL_TAB.TAB_2)"
              role="tab"
          >
            <slot name="tab-2">
              <img src="/images/icons/jewellery.svg" alt="jewellery">
              <div class="block">
                <p class="m-0 font-extrabold black">JEWELLERY</p>
              </div>
            </slot>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.mobile-navigation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent !important;
  backdrop-filter: none !important;
}

.mobile-logo {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1001;
  background-color: #25282D;
  padding: 0;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.mobile-logo img {
  height: 40px;
  width: auto;
  margin-top: 5px;
}

.mobile-nav-tabs {
  position: absolute;
  top: 75px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1002;
  width: auto;
  padding: 0;
  background: transparent !important;
  backdrop-filter: none !important;
  box-shadow: none !important;
}

.mobile-nav-tabs *,
.mobile-nav-tabs *::before,
.mobile-nav-tabs *::after {
}

.mobile-nav-tabs .nav.nav-tabs.nav-tab-icons {
  border: none !important;
  display: flex;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  gap: 0;
  margin: 0;
  background: none !important;
  border-radius: 30px;
  overflow: visible;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  backdrop-filter: none !important;
  width: 70%;
  max-width: 450px;
  align-items: center;
  justify-content: center;
}

.mobile-nav-tabs .nav-item {
  flex: 0 0 auto;
  background: none !important;
  display: flex;
  min-width: 0;
}

.mobile-nav-tabs .nav-link {
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  border: none;
  border-radius: 0;
  background: #FFFFFF;
  color: #000000;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  position: relative;
  white-space: nowrap !important;
  box-shadow: none !important;
  width: auto;
  min-height: 30px;
  flex: none;
}

/* First button (PRINT) - with special background and rounded corners */
.mobile-nav-tabs .nav-item:first-child .nav-link {
  background: #E4E3DB;
  border-radius: 30px;
  padding: 8px 22px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
  margin-right: -8px;
}

.mobile-nav-tabs .nav-item:first-child .nav-link::after {
  content: '';
  position: absolute;
  right: -1px;
  top: 15%;
  bottom: 15%;
  width: 2px;
  background: #D0D0D0;
  border-radius: 1px;
}

/* Last button (JEWELLERY) */
.mobile-nav-tabs .nav-item:last-child .nav-link {
  background: #FFFFFF;
  border-radius: 0 30px 30px 0;
  padding: 8px 22px 8px 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

/* Active state for PRINT */
.mobile-nav-tabs .nav-item:first-child .nav-link.active {
  background: #E4E3DB;
  font-weight: 800;
}

/* Active state for JEWELLERY */
.mobile-nav-tabs .nav-item:last-child .nav-link.active {
  background: #FFFFFF;
  font-weight: 800;
}

.mobile-nav-tabs .nav-item:not(:last-child) .nav-link::after {
  display: none;
}

.mobile-nav-tabs .nav-link.active {
  color: #000;
  font-weight: 800;
}

.mobile-nav-tabs .nav-link.active::after {
  display: none;
}

.mobile-nav-tabs .nav-link img {
  width: 16px;
  height: 16px;
  margin-right: 3px;
  margin-bottom: 0;
  filter: none;
}

.mobile-nav-tabs .nav-link .block {
  text-align: left;
}

.mobile-nav-tabs .nav-link p {
  font-size: 11px;
  line-height: 1;
  margin: 0;
  white-space: nowrap;
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mobile-nav-tabs .nav-link.active p {
  color: #000000;
}

@media (max-width: 480px) {
  .mobile-nav-tabs {
    max-width: 380px;
    padding: 0 20px;
  }

  .mobile-nav-tabs .nav-link {
    padding: 20px 35px;
    min-width: 140px;
    min-height: 10px;
  }

  .mobile-nav-tabs .nav-link img {
    width: 18px;
    height: 18px;
    margin-right: 3px;
  }

  .mobile-nav-tabs .nav-link p {
    font-size: 13px;
  }

  .mobile-logo img {
    height: 32px;
  }
}

@media (max-width: 360px) {
  .mobile-nav-tabs {
    max-width: 340px;
    padding: 0 15px;
  }

  .mobile-nav-tabs .nav-link {
    padding: 18px 30px;
    min-width: 120px;
    min-height: 10px;
  }

  .mobile-nav-tabs .nav-link p {
    font-size: 12px;
  }
}
</style>