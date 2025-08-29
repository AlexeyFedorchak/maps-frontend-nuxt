<script setup lang="ts">
  import { MAP_LAYOUTS } from '~/constants/map-layouts';
  import { MAP_DESIGNS } from '~/constants/map-designs';

  useHead({
    title: 'Design & Create Your Personalised Location Map | Made Prints',
  });
</script>

<template>
  <div class="main-container">
    <!-- Left Side - Map Preview -->
    <div class="map-preview-section">
      <!-- Above - Map Preview -->
      <div class="map-preview-title flex-c">
        <div class="flex-c">
          <div class="icons water-drop mr-2"></div>
          <span>Ultra Hd Print</span>
        </div>
        <div class="flex-c">
          <div class="icons lifetime mr-2"></div>
          <span class="mr-2">Lifetime Warranty</span>
          <NuxtImg src="/images/icons/info.svg" alt="info" />
        </div>
        <div class="flex-c">
          <div class="icons feather mr-2"></div>
          <span>Gicelle Art Prints</span>
        </div>
      </div>

      <div class="map-frame rectangle-container">
        <div id="interactiveMap" class="rectangle-layout"></div>
        <div class="map-details">
          <div class="map-title">London, UK</div>
          <div class="map-coordinates">51.507°N 0.128°W</div>
        </div>
      </div>
      <!-- Border overlay -->
      <div class="map-border"></div>
    </div>

    <!-- Right Side - Controls -->
    <div class="controls-section">
      <!-- Header with Logo -->
      <div class="header-section">
        <NuxtImg  src="/images/logo.svg" alt="Logo" />
      </div>

      <!-- Content Area -->
      <div class="content-area">
        <!-- Product Info -->
        <div class="container-info">
          <p class="product-title">Custom Location Map</p>
          <p class="product-description">
            Your special chosen place, captured in the finest detail. High quality archival grade paper. Giclee print to last a lifetime.
          </p>
        </div>

        <ul class="nav nav-tabs nav-tab-icons flex" id="type-tab" role="tablist">
          <li class="nav-item" role="presentation">
            <div class="nav-link active flex py-1 px-2" id="print-tab" data-bs-toggle="tab" data-bs-target="#home"  role="tab" aria-controls="home" aria-selected="true">
              <NuxtImg src="/images/icons/print.svg" alt="print" />
              <div class="block mt-2">
                <p class="m-0 font-extrabold black">Create Print</p>
                <p class="m-0 sub-title">Capture moments</p>
              </div>
            </div>
          </li>
          <li class="nav-item" role="presentation">
            <div class="nav-link flex py-1 px-2" id="jewellery-tab" data-bs-toggle="tab" data-bs-target="#profile" role="tab" aria-controls="profile" aria-selected="false">
              <NuxtImg  src="/images/icons/jewellery.svg" alt="jewellery" />
              <div class="block mt-2">
                <p class="m-0 font-extrabold black">Create Jewellery</p>
                <p class="m-0 sub-title">Wearables memories</p>
              </div>
            </div>
          </li>
        </ul>


        <div class="tab-content" id="type-tab-content">
          <div class="tab-pane fade show active w-full" id="home" role="tabpanel" aria-labelledby="print-tab">
            <!-- Steps -->
            <div class="flex justify-items-center mt-2 mb-4" style="display: none;">
              <div class="steps">
                <div class="step active" id="locationStep">
                  <div class="step-title uppercase">Create</div>
                </div>
                <div class="step" id="designStep">
                  <div class="step-title uppercase">Craft</div>
                </div>
                <div class="step" id="chooseStep">
                  <div class="step-title uppercase">Choose</div>
                </div>
              </div>
            </div>

            <!-- Location Content -->
            <div id="locationContent">
              <div class="section-title mb-3">Location map data</div>

              <div style="position: relative; margin-bottom: 20px;">
                <div class="input-group flex-nowrap">
                                    <span class="input-group-text border-radius-l" id="location">
                                        <span>Location</span>
                                    </span>
                  <input id="locationSearch" type="text" class="form-control border-radius-r" placeholder="Search here..." aria-label="Search Here" aria-describedby="location" autocomplete="off">
                </div>
                <div id="searchResults" style="position: absolute; top: 100%; left: 0; right: 0; background: white; border: 1px solid #ddd; border-radius: 20px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); max-height: 200px; overflow-y: auto; z-index: 1000; display: none;"></div>
              </div>
              <div style="position: relative; margin-bottom: 20px;">
                <div class="input-group flex-nowrap">
                                    <span class="input-group-text border-radius-l" id="title">
                                        <span>Title</span>
                                    </span>
                  <input type="text" class="form-control border-radius-r" placeholder="Custom title" aria-label="Custom title" aria-describedby="title" autocomplete="off">
                </div>
              </div>
              <div style="position: relative; margin-bottom: 20px;">
                <div class="input-group flex-nowrap">
                                    <span class="input-group-text border-radius-l" id="subtitle">
                                        <span>Sub Title</span>
                                    </span>
                  <input type="text" class="form-control border-radius-r" placeholder="Type here..." aria-label="Subtitle" aria-describedby="subtitle" autocomplete="off">
                </div>
              </div>
            </div>


            <!-- Design Content (Hidden by default) -->
            <div id="designContent" style="display: none;">
              <!-- Design Section -->
              <div><span class="section-title uppercase mr-2">Theme:</span><span class="sub-title">Original-black</span></div>

              <div class="design-grid">
                <div v-for="(design, index) in MAP_DESIGNS" :key="design.id"
                     class="design-option"
                     :class="{ selected: index === 0 }"
                     data-design-id="{{design.id}}"
                     data-full-image="{{design.full_image}}">
                  <div class="design-preview">
                    <div v-if="design.badge" class="design-badge">{{design.badge}}</div>
                    <NuxtImg :src="design.preview" :alt="design.name" />
                  </div>
                  <div class="design-name">{{design.name}}</div>
                </div>
              </div>

              <!-- Layout Section -->
              <div class="layout-section">
                <div><span class="section-title uppercase mr-2">Layout:</span><span class="sub-title">Photo</span></div>
                <div class="layout-grid mt-4">
                  <div v-for="layout in MAP_LAYOUTS"
                       class="layout-option"
                       :class="{ selected: layout.selected }"
                       data-layout-id="{{layout.id}}" data-shape="layout.shape">
                    <div class="layout-name">{{ layout.name }}</div>
                  </div>
                </div>

                <!-- Color Selector Section -->
                <div id="colorSelectorContainer"></div>

                <!-- Debug info for color selection -->
                <div id="colorDebugInfo" style="margin-top: 15px; padding: 10px; background: #f0f0f0; border-radius: 5px; font-size: 11px; display: none;">
                  <strong>Debug Info:</strong><br>
                  <span id="debugSelectedColor">No color selected</span><br>
                  <span id="debugMapUrl">No map URL generated</span>
                </div>
              </div>
            </div>

            <div id="chooseContent" style="display: none;">
              <!-- Choose Size Section -->
              <div class="mb-3"><span class="section-title uppercase mr-2">Size:</span><span class="sub-title">S (21x29.7cm) +&nbsp;&nbsp;£26.99</span></div>

              <div class="option-section">
                <div class="option mr-4">
                  <div>A4</div>
                </div>
                <div class="option active mr-4">
                  <div>S</div>
                </div>
                <div class="option mr-4">
                  <div>M</div>
                </div>
                <div class="option mr-4">
                  <div>L</div>
                </div>
                <div class="option">
                  <div>XL</div>
                </div>
              </div>

              <!-- Frame & Mount Section -->
              <div class="mt-5 mb-3"><span class="section-title uppercase mr-2">Frame & Mount:</span><span class="sub-title">Black Frame +&nbsp;&nbsp;£14.99&nbsp;&nbsp;&&nbsp;&nbsp;&nbsp;Ribbon + £2.49</span></div>

              <div class="option-section">
                <div class="option mr-4">
                  <div class="sub-title">X</div>
                </div>
                <div class="option active mr-4">
                  <div class="black-frame"></div>
                </div>
                <div class="option mr-4">
                  <div class="white-frame"></div>
                </div>
                <div class="option mr-4">
                  <div class="natural-frame"></div>
                </div>
                <p class="plus-sign">+</p>
                <div class="option active flex-c">
                  <div class="ribbon"></div>
                </div>
              </div>
            </div>

          </div>
          <div class="tab-pane fade w-full" id="profile" role="tabpanel" aria-labelledby="jewellery-tab">

          </div>
        </div>

        <!-- Price -->
        <div class="container-info">
          <p class="black mb-1"><span class="price-title mr-2">Total £79.99</span> Free Shipping and Gift Box included</p>
          <p class="sub-title"><span class="mr-2">or Pay in 3 interest free payments for £23.33</span><NuxtImg class="mb-1" src="/images/icons/info.svg" alt="info" /></p>

          <!-- Navigation -->
          <div class="navigation">
          </div>

          <div class="my-3 flex-c">
            <NuxtImg class="mr-3" src="/images/icons/5stars.svg" alt="Trustpilot 5 stars" />
            <span class="mr-3">Excellent</span>
            <span class="mr-3">4.9 out of 5</span>
            <NuxtImg class="mb-1" src="/images/icons/trustpilot.svg" alt="Trustpilot" />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>