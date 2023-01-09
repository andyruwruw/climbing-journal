<template>
  <div :class="$style.component">
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'home-view',

  created() {
    this.requiresLogin();
    this.handlePageLoad({ name: this.$route.name });
  },

  methods: {
    ...mapActions('navigation', [
      'handlePageLoad',
      'requiresLogin',
    ]),
  },
});
</script>

<style lang="scss" module>

</style>
