<template>
  <v-app-bar
    app
    flat
    outlined>
    <img
      :class="$style.logo"
      src="../../../assets/images/logo.png"
      alt="#" />

    <span :class="$style.title">
      Climbing Journal
    </span>
  </v-app-bar>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';

export default Vue.extend({
  name: 'AppBar',
});
</script>

<style lang="scss" module>
.logo {
  width: 30px;
}

.title {
  font-family: 'Chivo', sans-serif;
  font-weight: bold;
  margin-left: .5rem;
}

</style>
