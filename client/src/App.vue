<template>
  <v-app>
    <app-bar />

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
// Packages
import { mapActions } from 'vuex';
import Vue from 'vue';

// Local Imports./components/ui/app-bar/app-bar.vue
import AppBar from './components/ui/app-bar/app-bar.vue';

export default Vue.extend({
  name: 'App',

  components: {
    AppBar,
  },

  created() {
    this.checkUser();
  },

  methods: {
    ...mapActions('user', [
      'checkUser',
    ]),
  },
});
</script>
