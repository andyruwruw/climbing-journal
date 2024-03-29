// Packages
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

// Local Imports
import api from '../../api';

// Types
import {
  User,
  UserPrivacy,
} from '../../types';

/**
 * User Module
 *
 * The user module will manage the current logged in user and their
 * general information.
 */

// State interface
export interface AuthModuleState extends Record<string, any> {
  /**
   * Current logged in user.
   */
  user: User | null;
}

// Default state
const defaultState = (): AuthModuleState => ({
  user: null,
});

// Module state
const moduleState: AuthModuleState = defaultState();

// Module getters
const getters: GetterTree<AuthModuleState, any> = {
  /**
   * Retrieves the current logged in user.
   *
   * @param {AuthModuleState} state Module state.
   * @returns {User | null} Current logged in user.
   */
  getUser(state: AuthModuleState): User | null {
    return state.user;
  },

  /**
   * Whether a user is currently logged in.
   *
   * @param {AuthModuleState} state Module state.
   * @returns {boolean} Whether a user is logged in.
   */
  isLoggedIn(state: AuthModuleState): boolean {
    return state.user !== null;
  },
};

// Module mutations
const mutations: MutationTree<AuthModuleState> = {
  /**
   * Sets current logged in user.
   *
   * @param {NavigationState} state Module state.
   * @param {User | null} user User to set.
   */
  setUser(
    state: AuthModuleState,
    user: User | null,
  ): void {
    state.user = user;
  },

  /**
   * Resets the state to default.
   *
   * @param {NavigationState} state Module state.
   */
  reset(state: AuthModuleState): void {
    const nextState = defaultState();
    const fields = Object.keys(nextState);

    for (let i = 0; i < fields.length; i += 1) {
      state[fields[i]] = nextState[fields[i]];
    }
  },
};

// Module actions
const actions: ActionTree<AuthModuleState, any> = {
  /**
   * Logs a user in with the website.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, any>} payload Action payload.
   * @param {string} payload.username User's username.
   * @param {string} payload.password User's password.
   */
  async login({
    commit,
    dispatch,
  }, {
    username,
    password,
  }): Promise<void> {
    try {
      const user = await api.authentication.login(
        username,
        password,
      );

      if (!('message' in user)) {
        commit('setUser', user);
        dispatch('navigation/goToHome', undefined, { root: true });
      } else {
        dispatch('error/logError', { error: user.message }, { root: true });
      }
    } catch (error) {
      dispatch('error/logError', { error: `${error}` }, { root: true });
    }
  },

  /**
   * Registers a user in with the website.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   * @param {Record<string, any>} payload Action payload.
   * @param {string} payload.name User's name.
   * @param {string} payload.username User's username.
   * @param {string} payload.password User's password.
   * @param {number} [payload.started = -1,] When the user started climbing.
   * @param {number} [payload.height = -1,] The user's height.
   * @param {number} [payload.span = 100,] The user's span to height difference.
   * @param {number} [payload.weight = -1,] The user's weight.
   * @param {string} [payload.image = '',] The user's profile image.
   * @param {UserPrivacy} [payload.privacy = 'unlisted',] Privacy setttings.
   */
  async register({
    commit,
    dispatch,
  }, {
    name,
    username,
    password,
    started = -1,
    height = -1,
    span = 100,
    weight = -1,
    image = '',
    privacy = 'unlisted' as UserPrivacy,
  }): Promise<void> {
    try {
      const user = await api.authentication.register(
        name,
        username,
        password,
        started,
        height,
        span,
        weight,
        image,
        privacy,
      );

      if (!('message' in user)) {
        commit('setUser', user);
        dispatch('navigation/goToHome', undefined, { root: true });
      } else {
        dispatch('error/logError', { error: user.message }, { root: true });
      }
    } catch (error) {
      dispatch('error/logError', { error: `${error}` }, { root: true });
    }
  },

  /**
   * Checks if user has a current session.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   */
  async checkUser({
    commit,
    dispatch,
  }): Promise<void> {
    try {
      const user = await api.authentication.checkUser();

      if (!('message' in user)) {
        commit('setUser', user);
        dispatch('navigation/goToHome', undefined, { root: true });
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Logs a user out and clears state.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   */
  logout({
    commit,
    dispatch,
  }): void {
    commit('reset');
    dispatch('navigation/goToLanding', undefined, { root: true });
    api.authentication.logout();
  },
};

// Module
const user: Module<AuthModuleState, Record<string, any>> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default user;
