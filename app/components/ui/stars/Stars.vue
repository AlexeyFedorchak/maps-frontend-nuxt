<script setup lang="ts">

</script>

<template>
  <div class="tp-stars tp-stars--5 inline-block align-middle overflow-hidden w-28">
    <svg role="img" aria-labelledby="starRating" viewBox="0 0 251 50" xmlns="http://www.w3.org/2000/svg">
      <g class="tp-star">
        <path class="tp-star__canvas" fill="#dcdce6" d="M0 49.330002h46.375586V0H0z"></path>
        <path class="tp-star__shape"
              d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z"
              fill="#FFF"></path>
      </g>
      <g class="tp-star">
        <path class="tp-star__canvas" fill="#dcdce6" d="M51.24816 49.330002h46.375587V0H51.248161z"></path>
        <path class="tp-star__canvas--half" fill="#dcdce6"
              d="M51.24816 49.330002h23.187793V0H51.248161z"></path>
        <path class="tp-star__shape"
              d="M74.990978 31.32991L81.150908 30 84 39l-9.660206-7.202786L64.30279 39l3.895636-11.840666L58 19.841466h12.605577L74.499595 8l3.895637 11.841466H91L74.990978 31.329909z"
              fill="#FFF"></path>
      </g>
      <g class="tp-star">
        <path class="tp-star__canvas" fill="#dcdce6" d="M102.532209 49.330002h46.375586V0h-46.375586z"></path>
        <path class="tp-star__canvas--half" fill="#dcdce6"
              d="M102.532209 49.330002h23.187793V0h-23.187793z"></path>
        <path class="tp-star__shape"
              d="M142.066994 19.711433L115.763298 38.80065l3.838215-11.797827-10.047304-7.291391h12.418975l3.837418-11.798624 3.837417 11.798624h12.418975zM125.81156 31.510075l7.183595-1.509576 2.862113 8.800152-10.045708-7.290576z"
              fill="#FFF"></path>
      </g>
      <g class="tp-star">
        <path class="tp-star__canvas" fill="#dcdce6" d="M153.815458 49.330002h46.375586V0h-46.375586z"></path>
        <path class="tp-star__canvas--half" fill="#dcdce6"
              d="M153.815458 49.330002h23.187793V0h-23.187793z"></path>
        <path class="tp-star__shape"
              d="M193.348355 19.711433L167.045457 38.80065l3.837417-11.797827-10.047303-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418974zM177.09292 31.510075l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z"
              fill="#FFF"></path>
      </g>
      <g class="tp-star">
        <path class="tp-star__canvas" fill="#dcdce6" d="M205.064416 49.330002h46.375587V0h-46.375587z"></path>
        <path class="tp-star__canvas--half" fill="#dcdce6"
              d="M205.064416 49.330002h23.187793V0h-23.187793z"></path>
        <path class="tp-star__shape"
              d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z"
              fill="#FFF"></path>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.tp-stars .tp-star__canvas, .tp-stars .tp-star__canvas--half {
  fill: #dcdce6
}

.tp-stars .tp-star__shape {
  fill: #fff
}

.tp-stars--1 .tp-star:nth-of-type(-n + 1) .tp-star__canvas, .tp-stars--1 .tp-star:nth-of-type(-n + 1) .tp-star__canvas--half {
  fill: #ff3722
}

.tp-stars--2 .tp-star:nth-of-type(-n + 2) .tp-star__canvas, .tp-stars--2 .tp-star:nth-of-type(-n + 2) .tp-star__canvas--half {
  fill: #ff8622
}

.tp-stars--3 .tp-star:nth-of-type(-n + 3) .tp-star__canvas, .tp-stars--3 .tp-star:nth-of-type(-n + 3) .tp-star__canvas--half {
  fill: #ffce00
}

.tp-stars--4 .tp-star:nth-of-type(-n + 4) .tp-star__canvas, .tp-stars--4 .tp-star:nth-of-type(-n + 4) .tp-star__canvas--half {
  fill: #73cf11
}

.tp-stars--5 .tp-star:nth-of-type(-n + 5) .tp-star__canvas, .tp-stars--5 .tp-star:nth-of-type(-n + 5) .tp-star__canvas--half {
  fill: #00b67a
}

.tp-stars--1--half .tp-star:nth-of-type(-n + 2) .tp-star__canvas--half {
  fill: #ff3722
}

.tp-stars--2--half .tp-star:nth-of-type(-n + 3) .tp-star__canvas--half {
  fill: #ff8622
}

.tp-stars--3--half .tp-star:nth-of-type(-n + 4) .tp-star__canvas--half {
  fill: #ffce00
}

.tp-stars--4--half .tp-star:nth-of-type(-n + 4) .tp-star__canvas, .tp-stars--4--half .tp-star:nth-of-type(-n + 4) .tp-star__canvas--half {
  fill: #00b67a
}

.tp-stars--4--half .tp-star:nth-of-type(-n + 5) .tp-star__canvas--half {
  fill: #00b67a
}
</style>