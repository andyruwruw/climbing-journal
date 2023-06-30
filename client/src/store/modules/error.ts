// Packages
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

/**
 * Error Module
 *
 * Global handler for errors.
 */

// State interface
export interface ErrorModuleState extends Record<string, any> {
  /**
   * Current error message.
   */
  error: string | null;
}

// Default state
const defaultState = (): ErrorModuleState => ({
  error: null,
});

// Module state
const moduleState: ErrorModuleState = defaultState();

// Module getters
const getters: GetterTree<ErrorModuleState, any> = {
  /**
   * Whether the site is in a state of error.
   *
   * @param {ErrorModuleState} state Module state.
   * @returns {boolean} Whether the site is in a state of error.
   */
  isError(state: ErrorModuleState): boolean {
    return state.error !== null;
  },
};

// Module mutations
const mutations: MutationTree<ErrorModuleState> = {
  /**
   * Sets error message.
   *
   * @param {NavigationState} state Module state.
   * @param {string | null} error New error.
   */
  setError(
    state: ErrorModuleState,
    error: string | null,
  ): void {
    state.error = error;
  },

  /**
   * Resets the state to default.
   *
   * @param {NavigationState} state Module state.
   */
  reset(state: ErrorModuleState): void {
    const nextState = defaultState();
    const fields = Object.keys(nextState);

    for (let i = 0; i < fields.length; i += 1) {
      state[fields[i]] = nextState[fields[i]];
    }
  },
};

// Module actions
const actions: ActionTree<ErrorModuleState, any> = {
  /**
   * Sets a new error to be displayed.
   *
   * @param {ActionContext<NavigationState, any>} context Vuex action context.
   */
  logError({
    commit,
    dispatch,
  }, {
    error,
  }): void {
    let newError = error;

    if (error === 'AxiosError: Network Error') {
      newError = 'Looks like our server is taking a rest day, Sorry!';
    }

    commit('setError', newError);

    setTimeout(() => dispatch('logError', {
      error: null,
    }), 5000);
  },
};

// Module
const error: Module<ErrorModuleState, Record<string, any>> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default error;
