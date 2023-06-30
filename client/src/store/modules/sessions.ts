// Packages
import api from '@/api';
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

// Types
import { Session } from '../../types';

/*
  User Module.

  The user module will manage the current logged in user and their
  general information.
*/

// State interface
export interface SessionsModuleState extends Record<string, any> {
  /**
   * Current logged in user.
   */
  sessions: Session[];
}

// Default state
const defaultState = (): SessionsModuleState => ({
  sessions: [],
});

// Module state
const moduleState: SessionsModuleState = defaultState();

// Module getters
const getters: GetterTree<SessionsModuleState, any> = {
  /**
   * Retrieves the user's sessions.
   *
   * @param {SessionsModuleState} state Module state.
   * @returns {Session[]} List of user's sessions.
   */
  getSessions(state: SessionsModuleState): Session[] {
    return state.sessions;
  },
};

// Module mutations
const mutations: MutationTree<SessionsModuleState> = {
  /**
   * Sets the user's sessions.
   *
   * @param {NavigationState} state Module state.
   * @param {Session[]} sessions Sessions to set.
   */
  setSessions(
    state: SessionsModuleState,
    sessions: Session[],
  ): void {
    state.sessions = sessions;
  },

  /**
   * Resets the state to default.
   *
   * @param {NavigationState} state Module state.
   */
  reset(state: SessionsModuleState): void {
    const nextState = defaultState();
    const fields = Object.keys(nextState);

    for (let i = 0; i < fields.length; i += 1) {
      state[fields[i]] = nextState[fields[i]];
    }
  },
};

// Module actions
const actions: ActionTree<SessionsModuleState, any> = {
  async loadSessions({
    commit,
    rootGetters,
  }): Promise<void> {
    try {
      const response = await api.session.getUserSessions(rootGetters['user/getUser']._id);

      if (response) {
        commit('setSessions', response);
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
    commit('shows/reset', undefined, { root: true });
    dispatch('navigation/goToLanding', undefined, { root: true });
    api.authentication.logout();
  },
};

// Module
const user: Module<SessionsModuleState, Record<string, any>> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default user;
