<template>
  <div :class="$style.component">
    <div
      :class="$style['content-wrapper']"
      ref="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import ClimbingHold from '@/components/ui/accents/ClimbingHold.vue';

export default Vue.extend({
  name: 'HoldSurrounded',

  components: {
    ClimbingHold,
  },

  created() {
  }
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.content-wrapper {
  max-width: 1080px;
}
</style>
