<template>
  <v-app-bar
    app
    flat
    outlined>
    <div :class="$style.component">
      <div :class="$style.logo">
        <img
          :class="$style.icon"
          src="../../../assets/images/logo.png"
          alt="#" />

        <span :class="$style.title">
          Climbing Journal
        </span>
      </div>

      <v-btn
        v-if="!isLoggedIn"
        outlined
        @click="goToLogin">
        Login
      </v-btn>

      <app-bar-profile
        v-if="isLoggedIn" />
    </div>
  </v-app-bar>
</template>

<script lang="ts">
// Packages
import {
  mapActions,
  mapGetters,
} from 'vuex';
import Vue from 'vue';

// Local Imports
import AppBarProfile from './app-bar-profile.vue';

export default Vue.extend({
  name: 'app-bar',

  components: {
    AppBarProfile,
  },

  computed: {
    ...mapGetters('user', [
      'isLoggedIn',
    ]),
  },

  methods: {
    ...mapActions('navigation', [
      'goToLogin',
    ]),
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
}

.icon {
  width: 30px;
}

.title {
  font-family: 'Chivo', sans-serif;
  font-weight: bold;
  margin-left: .5rem;
}
</style>
