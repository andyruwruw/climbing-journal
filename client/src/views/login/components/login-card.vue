<template>
  <v-card>
    <div :class="$style.content">
      <h3>
        Welcome Back
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
        outlined
        block
        color="primary"
        :class="$style.action"
        @click="handleSubmit">
        Login
      </v-btn>

      <v-btn
        outlined
        block
        color="primary"
        :class="$style.action"
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
  width: calc(100vw - 2rem);
  max-width: 400px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }
}

.action:not(:last-child) {
  margin-bottom: 1.5rem;
}
</style>
