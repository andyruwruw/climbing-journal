<template>
  <div
    :class="$style.component"
    :style="{
      backgroundImage: 'url(\'' + getImage + '\')',
    }"
    @click="handleClick"
    @keydown="handleClick">
  </div>
</template>

<script lang="ts">
// Packages
import {
  mapActions,
  mapGetters,
} from 'vuex';
import Vue from 'vue';

export default Vue.extend({
  name: 'app-bar-profile',

  computed: {
    ...mapGetters('user', [
      'getUsername',
      'getImage',
    ]),
  },

  methods: {
    ...mapActions('navigation', [
      'goToProfile',
    ]),

    handleClick() {
      this.goToProfile({
        id: this.getUsername,
      });
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  background-size: cover;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
}
</style>
