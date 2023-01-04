// Packages
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

// Local Imports
import router from '../../router';

/*
  Navigation Module
  In order to maintain the Vuex store as the center of logic, and keep
  the components soley as methods of displaying the data, all components
  will use the navigation module to route to various pages
  The navigation module will manage the current page and provide getters
  to turn on and off various styles.
*/

// State interface
export interface NavigationState {
  currentPage: string;
}

// Default state
export const defaultState = (): NavigationState => ({
  currentPage: '',
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
};

// Module actions
const actions: ActionTree<NavigationState, any> = {
  /**
   * On each page change, update the current page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, string>} payload Incoming payload.
   * @param {string} payload.name Name of the new page.
   */
  handlePageLoad(
    { commit },
    { name },
  ): void {
    commit('setCurrentPage', name);
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
   * Routes the user to Categories page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   */
  goToCategories({
    dispatch,
    state,
  }): void {
    try {
      if (state.currentPage !== 'Categories') {
        router.push('/category');
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to a Category page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, number>} payload Incoming payload.
   * @param {number} payload.id ID of the category.
   */
  goToCategory(
    {
      dispatch,
      state,
    },
    { id },
  ): void {
    try {
      if (state.currentPage !== 'Category') {
        router.push(`/category/${id}`);
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
   * Routes the user to Home page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   */
  search({
    dispatch,
  }, {
    query,
  }): void {
    try {
      router.push(`/search/${query}`);
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
   * Routes the user to a Platform page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, number>} payload Incoming payload.
   * @param {number} payload.id ID of the platform.
   */
  goToPlatform(
    {
      dispatch,
      state,
    },
    { id },
  ): void {
    try {
      if (state.currentPage !== 'Platform') {
        router.push(`/platform/${id}`);
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
      if (state.currentPage !== 'Profile') {
        router.push(`/profile/${id}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to Reviews page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   */
  goToReviews({
    dispatch,
    state,
  }): void {
    try {
      if (state.currentPage !== 'Reviews') {
        router.push('/review');
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to a Review page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, number>} payload Incoming payload.
   * @param {number} payload.reviewId ID of the review.
   * @param {number} payload.showId ID of the show the review is on.
   */
  goToReview(
    {
      dispatch,
      state,
    },
    {
      reviewId,
      showId,
    },
  ): void {
    try {
      if (state.currentPage !== 'Review') {
        router.push(`/review/${showId}/${reviewId}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to an Edit Review page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, number>} payload Incoming payload.
   * @param {number} payload.reviewId ID of the review to edit.
   * @param {number} payload.showId ID of the show the review is on.
   */
  goToReviewEdit(
    {
      dispatch,
      state,
    },
    {
      reviewId,
      showId,
    },
  ): void {
    try {
      if (state.currentPage !== 'EditReview') {
        router.push(`/review/${showId}/${reviewId}/edit`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to a Create Review page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, number>} payload Incoming payload.
   * @param {number} payload.id ID of the show to review.
   */
  goToReviewCreate(
    {
      dispatch,
      state,
    },
    { showId },
  ): void {
    try {
      if (state.currentPage !== 'CreateReview') {
        router.push(`/review/${showId}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to Shows page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   */
  goToShows(
    {
      dispatch,
      state,
    },
  ): void {
    try {
      if (state.currentPage !== 'Shows') {
        router.push('/show');
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to a Show page.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {number} payload.id ID of the show to review.
   */
  goToShow(
    {
      dispatch,
      state,
    },
    { id },
  ): void {
    try {
      if (state.currentPage !== 'Show') {
        router.push(`/show/${id}`);
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