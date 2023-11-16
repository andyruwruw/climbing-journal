// Packages
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

// Local Imports
import router from '../../router';

// Types
import { Dictionary } from '../../types';

// State interface
export interface NavigationState {
  currentPage: string;

  params: Dictionary<any>;

  query: Dictionary<any>;
}

// Default state
export const defaultState = (): NavigationState => ({
  currentPage: '',

  params: {} as Dictionary<any>,

  query: {} as Dictionary<any>,
});

// Module state
const moduleState: NavigationState = defaultState();

// Module getters
const getters: GetterTree<NavigationState, any> = {
  /**
   * Whether to apply nav-bar and limit width styles.
   *
   * @param {NavigationState} state Module state.
   * @returns {boolean} Whether the base layout should be used.
   */
  isBaseLayout: (state): boolean => (![
    'Landing',
    'Login',
    '404',
    '503',
  ].includes(state.currentPage)),
};

// Module mutations
const mutations: MutationTree<NavigationState> = {
  /**
   * Sets value of current page.
   *
   * @param {NavigationState} state Module state.
   * @param {string} page Page name.
   */
  setCurrentPage(
    state: NavigationState,
    page: string,
  ): void {
    state.currentPage = page;
  },

  /**
   * Sets params of current page.
   *
   * @param {NavigationState} state Module state.
   * @param {Dictionary<any>} params Page params.
   */
  setPageParams(
    state: NavigationState,
    params: Dictionary<any>,
  ): void {
    state.params = params;
  },

  /**
   * Sets query of current page.
   *
   * @param {NavigationState} state Module state.
   * @param {Dictionary<any>} query Page query.
   */
  setPageQuery(
    state: NavigationState,
    query: Dictionary<any>,
  ): void {
    state.query = query;
  },
};

// Module actions
const actions: ActionTree<NavigationState, any> = {
  /**
   * On each page change, update the current page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, string>} payload Incoming payload.
   */
  handlePageLoad(
    { commit },
    {
      name,
      query,
      params,
    },
  ): void {
    commit('setCurrentPage', name);
    commit('setPageParams', params);
    commit('setPageQuery', query);
  },

  /**
   * Checks if user is logged in, and reroutes to landing if not.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   */
  requiresLogin({
    rootGetters,
    dispatch,
  }): void {
    try {
      if (!rootGetters['user/isLoggedIn']) {
        router.push('/');
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to Login page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   */
  goToLogin({
    dispatch,
    rootGetters,
    state,
  }): void {
    try {
      if (state.currentPage !== 'Login' && !rootGetters['user/isLoggedIn']) {
        router.push('/login');
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to Home page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   */
  goToHome({
    dispatch,
    state,
  }): void {
    try {
      if (state.currentPage !== 'Home') {
        router.push('/home');
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to Landing page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   */
  goToLanding({
    dispatch,
    state,
  }): void {
    try {
      if (state.currentPage !== 'Landing') {
        router.push('/');
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to a route attempt.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, string>} payload Incoming payload.
   * @param {string} payload.user ID of the user.
   * @param {string} payload.id ID of the attempt.
   */
  goToAttempt(
    {
      dispatch,
      state,
    },
    {
      user,
      id,
    },
  ): void {
    try {
      if (state.currentPage !== 'Attempt'
        || state.params.id !== id
        || state.params.user !== user) {
        router.push(`/attempt/${user}/${id}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to error page.
   */
  goTo404({ state }) {
    if (state.currentPage !== '404') {
      router.push('/404');
    }
  },

  /**
   * Routes the user to error page.
   */
  goTo500({ state }) {
    if (state.currentPage !== '500') {
      router.push('/500');
    }
  },

  /**
   * Routes the user to a route interest.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, string>} payload Incoming payload.
   * @param {string} payload.user ID of the user.
   * @param {string} payload.id ID of the interest.
   */
  goToInterest(
    {
      dispatch,
      state,
    },
    {
      user,
      id,
    },
  ): void {
    try {
      if (state.currentPage !== 'Interest'
        || state.params.id !== id
        || state.params.user !== user) {
        router.push(`/interest/${user}/${id}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to a location.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, number>} payload Incoming payload.
   * @param {number} payload.id ID of the location.
   */
  goToLocation(
    {
      dispatch,
      state,
    },
    { id },
  ): void {
    try {
      if (state.currentPage !== 'Location' || state.params.id !== id) {
        router.push(`/location/${id}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to an area in a location..
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, string>} payload Incoming payload.
   * @param {string} payload.location ID of the location.
   * @param {string} payload.area ID of the area.
   */
  goToArea(
    {
      dispatch,
      state,
    },
    {
      location,
      area,
    },
  ): void {
    try {
      if (state.currentPage !== 'Area'
        || state.params.id !== location
        || state.params.area !== area) {
        router.push(`/location/${location}/area/${area}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to a Profile page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, number>} payload Incoming payload.
   * @param {number} payload.id ID of the user.
   */
  goToProfile(
    {
      dispatch,
      state,
    },
    { id },
  ): void {
    try {
      if (state.currentPage !== 'Profile' || state.params.id !== id) {
        router.push(`/profile/${id}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to an route in a location.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, string>} payload Incoming payload.
   * @param {string} payload.location ID of the location.
   * @param {string} payload.route ID of the route.
   */
  goToRoute(
    {
      dispatch,
      state,
    },
    {
      location,
      route,
    },
  ): void {
    try {
      if (state.currentPage !== 'Route'
        || state.params.id !== location
        || state.params.route !== route) {
        router.push(`/location/${location}/route/${route}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to a session log.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, string>} payload Incoming payload.
   * @param {string} payload.user ID of the user.
   * @param {string} payload.id ID of the interest.
   */
  goToSession(
    {
      dispatch,
      state,
    },
    {
      user,
      id,
    },
  ): void {
    try {
      if (state.currentPage !== 'Session'
        || state.params.id !== id
        || state.params.user !== user) {
        router.push(`/profile/${user}/session/${id}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to a shoe model.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, string>} payload Incoming payload.
   * @param {string} payload.brand Brand of the shoes.
   * @param {string} payload.model Model of the shoes.
   */
  goToShoes(
    {
      dispatch,
      state,
    },
    {
      brand,
      model,
    },
  ): void {
    try {
      if (state.currentPage !== 'Shoes'
        || state.params.brand !== brand
        || state.params.model !== model) {
        router.push(`/shoes/${brand}/${model}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to a shoe model log.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, string>} payload Incoming payload.
   * @param {string} payload.brand Brand of the shoes.
   * @param {string} payload.model Model of the shoes.
   * @param {string} payload.id ID of the log.
   */
  goToShoesLog(
    {
      dispatch,
      state,
    },
    {
      brand,
      model,
      id,
    },
  ): void {
    try {
      if (state.currentPage !== 'ShoesLog'
        || state.params.brand !== brand
        || state.params.model !== model
        || state.params.id !== id) {
        router.push(`/shoes/${brand}/${model}/${id}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },
};

// Module
const navigation: Module<NavigationState, Record<string, any>> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default navigation;
