<template>
  <v-card>
    <div :class="$style.content">
      <h3>
        Sign In
      </h3>

      <v-text-field
        placeholder="Username"
        v-model="username"
        required
        outlined />

      <v-text-field
        placeholder="Password"
        type="password"
        v-model="password"
        required
        password
        outlined />

      <v-btn
        color="primary"
        @click="handleSubmit">
        Login
      </v-btn>

      <v-btn
        color="primary"
        @click="toggle">
        Register Instead
      </v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'login-card',

  data: () => ({
    username: '',

    password: '',
  }),

  methods: {
    ...mapActions('user', [
      'login',
    ]),

    handleSubmit() {
      this.login({
        username: this.username,
        password: this.password,
      });
    },

    toggle() {
      this.$emit('toggle');
    },
  },
});
</script>

<style lang="scss" module>
.content {
  margin: 2rem;
}
</style>
