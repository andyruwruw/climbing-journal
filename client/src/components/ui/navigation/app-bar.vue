<template>
  <v-app-bar
    app
    outlined
    flat>
    <img
      :class="$style.logo"
      src="../../../assets/images/logo.svg" />

    <span :class="$style.title">
      Climbing Journal
    </span>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app-bar',
});
</script>

<style lang="scss" module>
.logo {
  display: block;
  width: 32px;
}

.title {
  margin-left: .5rem;
}
</style>
