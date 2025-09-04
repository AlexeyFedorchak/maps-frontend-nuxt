<template>
  <div class="controls-section">
    <slot name="header">
      <UiControlPanelHeader logo="/images/logo.svg" alt="Logo"/>
    </slot>
    <div class="content-area">
      <slot name="content" />
    </div>
  </div>
</template>
