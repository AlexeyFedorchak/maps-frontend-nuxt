<template>
    <div>
      <AppHeader />
      <main>
        <slot />
      </main>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style>
  main {
    min-height: calc(100vh - 120px);
  }
  </style>