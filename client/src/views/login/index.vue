<template>
  <div :class="$style.component">
    <login-card
      v-if="isLogin"
      @toggle="handleToggle" />

    <register-card
      v-else
      @toggle="handleToggle" />
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';
import { mapActions } from 'vuex';

// Local Imports
import LoginCard from './components/login-card.vue';
import RegisterCard from './components/register-card.vue';

export default Vue.extend({
  name: 'login-view',

  components: {
    LoginCard,
    RegisterCard,
  },

  data: () => ({
    isLogin: true,
  }),

  created() {
    this.handlePageLoad({ name: this.$route.name });
    this.checkUser();
  },

  methods: {
    ...mapActions('navigation', [
      'handlePageLoad',
    ]),

    ...mapActions('user', [
      'checkUser',
    ]),

    handleToggle() {
      this.isLogin = !this.isLogin;
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
