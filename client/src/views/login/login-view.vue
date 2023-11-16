<template>
  <div :class="$style.component">
    <login-card />
  </div>
</template>

<script lang="ts">
// Packages
import { mapActions } from 'vuex';
import Vue from 'vue';

// Local Imports
import LoginCard from './components/login-card.vue';

export default Vue.extend({
  name: 'login-view',

  components: {
    LoginCard,
  },

  created() {
    this.handlePageLoad(this.$route.name);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
