<template>
  <div :class="$style.component">
  </div>
</template>

<script lang="ts">
// Packages
import {
  mapActions,
  mapGetters,
} from 'vuex';
import Vue from 'vue';

// Local Imports
import api from '../../api';

// Types
import { PublicUser } from '../../types';

export default Vue.extend({
  name: 'profile-view',

  data: () => ({
    user: null as PublicUser | null,
  }),

  computed: {
    ...mapGetters('user', [
      'getUsername',
      'getUser',
    ]),
  },

  created() {
    this.handlePageLoad(this.$route);

    this.retrieveProfile();
  },

  methods: {
    ...mapActions('navigation', [
      'handlePageLoad',
    ]),

    async retrieveProfile(): Promise<void> {
      const response = await api.user.getUser(this.$route.params.id);

      if ('username' in response) {
        this.user = response;
      } else {
        this.$router.push('/404');
      }

      // if (this.$route.params.id === this.getUsername) {
      //   this.user = this.getUser;
      // } else {
      //   const response = await api.user.getUser(this.$route.params.id);

      //   if ('username' in response) {
      //     this.user = response;
      //   } else {
      //     this.$router.push('/404');
      //   }
      // }
    },
  },
});
</script>

<style lang="scss" module>
.component {
  max-width: 1080px;
  margin: 0 auto;
}
</style>
