<template>
  <img
    :src="src"
    :class="$style.component"
    :style="{
      width: width,
    }"
    alt="#" />
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import { CLIMBING_HOLDS } from '@/config/images';

export default Vue.extend({
  name: 'ClimbingHold',

  data: () => ({
    index: 0,
  }),

  computed: {
    /**
     * Link to image.
     */
    src(): string {
      return `https://raw.githubusercontent.com/andyruwruw/climbing-journal/main/client/src/assets/images/holds/${CLIMBING_HOLDS[this.index].number}.png`;
    },

    /**
     * Revised width.
     */
    width(): string {
      return `${CLIMBING_HOLDS[this.index].width / 2}px`;
    },
  },

  created() {
    this.index = Math.floor(Math.random() * CLIMBING_HOLDS.length);
  },
});
</script>

<style lang="scss" module>
.component {
  image-resolution: from-image;
}
</style>
