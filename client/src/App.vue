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
import Vue from 'vue';

// Local Imports
import AppBar from './components/ui/app-bar/AppBar.vue';

export default Vue.extend({
  name: 'App',

  components: {
    AppBar,
  },
});
</script>
