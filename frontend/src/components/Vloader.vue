<script setup lang="ts">
</script>
<template>
<div class="loader">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
</template>

<style scoped lang="scss">
.loader {
  position: absolute;
  text-align: center;
  width: 100%;
  height: 100%;
  background: #0000002e;
  z-index: 999;
  top: 0;
  .spinner-border {
    position: fixed;
    top: 50%;
  }
}
</style>