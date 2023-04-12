<template>
  <div :class="$style.component">
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

export default Vue.extend({
  name: 'AboutView',
});
</script>

<style lang="scss" module>
.component {
  max-width: 1080px;
  margin: 0 auto;
}
</style>
