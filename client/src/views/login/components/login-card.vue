<template>
  <div :class="$style.component">
    <h2>
      {{ title }}
    </h2>

    <div :class="$style.fields">
      <v-text-field
        v-if="!isLogin"
        v-model="name"
        :class="$style.field"
        :disabled="isSubmitting"
        :error="isErrored"
        label="Full Name"
        outlined
        hide-details
        dense
        clearable />

      <v-text-field
        v-model="username"
        :class="$style.field"
        :disabled="isSubmitting"
        :error="isErrored"
        label="Username"
        outlined
        hide-details
        dense
        clearable />

      <v-text-field
        v-model="password"
        :class="$style.field"
        :disabled="isSubmitting"
        :error="isErrored"
        label="Password"
        type="password"
        outlined
        hide-details
        dense
        clearable />
    </div>

    <span :class="$style.error">
      {{ heldError }}
    </span>

    <div :class="$style.actions">
      <v-btn
        :class="$style.action"
        :disabled="isSubmitting"
        outlined
        @click="switchMethod">
        {{ switchLabel }}
      </v-btn>

      <v-btn
        :class="$style.action"
        :depressed="true"
        :disabled="isDisabled"
        :dark="!isDisabled"
        :loading="isSubmitting"
        @click="submit">
        {{ submitLabel }}
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
// Packages
import Vue from 'vue';
import {
  mapState,
  mapActions,
} from 'vuex';

/**
 * Authorization methods enum.
 */
const AUTH_METHOD = {
  LOGIN: 'login',
  REGISTER: 'register',
};

export default Vue.extend({
  name: 'LoginCard',

  data: () => ({
    /**
     * Stored error value.
     */
    heldError: null as string | null,

    /**
     * Current method of authentication.
     */
    method: AUTH_METHOD.LOGIN,

    /**
     * User's name.
     */
    name: '',

    /**
     * User's username.
     */
    username: '',

    /**
     * User's password
     */
    password: '',

    /**
     * Is submitting.
     */
    isSubmitting: false,
  }),

  computed: {
    ...mapState('error', [
      'error',
    ]),

    /**
     * Whether the current method is login.
     *
     * @type {boolean}
     */
    isLogin(): boolean {
      return this.method === AUTH_METHOD.LOGIN;
    },

    /**
     * Card title.
     *
     * @type {string}
     */
    title(): string {
      if (this.method === AUTH_METHOD.LOGIN) {
        return 'Welcome Back!';
      }
      return 'Let\'s Get Started';
    },

    /**
     * Whether submit is disabled.
     *
     * @type {boolean}
     */
    isDisabled(): boolean {
      return (this.method === AUTH_METHOD.LOGIN
          && !(this.username && this.password))
        || (this.method === AUTH_METHOD.REGISTER
          && !(this.username && this.password && this.name));
    },

    /**
     * Label for switching authentication method.
     *
     * @type {string}
     */
    switchLabel(): string {
      if (this.method === AUTH_METHOD.LOGIN) {
        return 'Register Instead';
      }
      return 'Login Instead';
    },

    /**
     * Label for submission.
     *
     * @type {string}
     */
    submitLabel(): string {
      if (this.method === AUTH_METHOD.LOGIN) {
        return 'Login';
      }
      return 'Register';
    },

    /**
     * Whether the component is in a state of error.
     */
    isErrored(): boolean {
      return this.heldError !== null;
    },
  },

  watch: {
    /**
     * Store error value.
     */
    error(): void {
      if (!this.error) {
        return;
      }

      this.heldError = this.error as unknown as string | null;
    },
  },

  methods: {
    ...mapActions('user', [
      'login',
      'register',
    ]),

    /**
     * Switch between logging in and registering.
     */
    switchMethod(): void {
      if (this.method === AUTH_METHOD.LOGIN) {
        this.method = AUTH_METHOD.REGISTER;
      } else {
        this.method = AUTH_METHOD.LOGIN;
      }
    },

    /**
     * Submit's the user's form.
     *
     * @returns {Promise<void>} Promise of the action.
     */
    async submit(): Promise<void> {
      if (this.isSubmitting) {
        return;
      }

      this.isSubmitting = true;

      if (this.method === AUTH_METHOD.LOGIN) {
        await this.login({
          username: this.username,
          password: this.password,
        });
      } else {
        await this.register({
          displayName: this.name,
          username: this.username,
          password: this.password,
        });
      }

      this.isSubmitting = false;
    },
  },
});
</script>

<style lang="scss" module>
.component {
  display: flex;
  flex-direction: column;
  width: calc(100% - 2rem);
  max-width: 600px;
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(0, 0, 0, 0.134);
  margin-bottom: 20vh;
}

.field {
  margin-top: 2rem !important;
}

.fields {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.error {
  text-align: right;
  color: rgb(246, 39, 39);
}

.actions {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 1rem;
}

.action:not(:last-of-type) {
  margin-right: 1rem;
}
</style>
