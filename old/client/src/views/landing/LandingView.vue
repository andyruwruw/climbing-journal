<template>
  <div :class="$style.component">
    <climbing-hold />

    <climbing-hold />

    <climbing-hold />

    <climbing-hold />
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

// Local Imports
import ClimbingHold from '@/components/ui/accents/ClimbingHold.vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'LandingView',

  components: {
    ClimbingHold,
  },

  created() {
    this.handlePageLoad({ name: this.$route.name });
  },

  methods: {
    ...mapActions('navigation', [
      'handlePageLoad',
    ]),
  },
});
</script>

<style lang="scss" module>
.component {
  max-width: 1080px;
  margin: 0 auto;
}
</style>
