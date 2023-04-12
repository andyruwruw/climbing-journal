// Packages
import Vue from 'vue';
import Vuex from 'vuex';

// Local Imports
import navigation from './modules/navigation';
import sessions from './modules/sessions';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    navigation,
    sessions,
    user,
  },
});
