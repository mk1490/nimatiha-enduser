export default {
    state: {
        id: null,
        sessionId: null,
        errors: [],
        username: '',
        avatar: '',
        phoneNumber: '',
        personnelCode: '',
        roles: [],
        deleteDialog: {
            visible: false, index: 0,
        },
        submitDelete: -1,
        loading: false,
        isLogin: !!localStorage.getItem('Authorization'),
        userPermissions: [],
    }, getters: {
        id: (state) => state.id,
        email: (state) => state.email,
        username: (state) => state.username,
        phoneNumber: (state) => state.phoneNumber,
        roles: (state) => state.roles,
        avatar: (state) => state.avatar,
        loading: (state) => state.loading,
        loginState: (state) => state.loginState,
        isLogin: (state) => state.isLogin,
        userPermissions: (state) => state.userPermissions,
        sessionId: (state) => state.sessionId,
        errors: (state) => state.errors,
    }, mutations: {
        SET_USER_INFO: (state, payload) => {
            state.name = payload.name;
            state.family = payload.family;
            state.username = payload.username;
            if (payload.roles) {
                state.roles = payload.roles;
            } else {
                state.roles = [];
            }
            state.avatar = payload.avatar;
            state.isLogin = true;
        },
        SET_PHOTO: (state, payload) => {
            state.avatar = payload;
        },
        SET_ERRORS: (state, payload) => {
            // state.errors = payload;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        }, SHOW_LOADING: (state, showLoading) => {
            state.loading = showLoading;
        }, ALL_PREFERENCES: (state, payload) => {
            state.allPreferences = payload;
        }, DELETE_DIALOG: (state, {index, visible}) => {
            state.deleteDialog.index = index;
            state.deleteDialog.visible = visible;
        }, SUBMIT_DELETE: (state, index) => {
            state.submitDelete = index;
        }, LOGOUT: (state) => {
            state.isLogin = false;
        }, REMOVE_PHOTO: (state) => {
            state.avatar = '';
        }, LOGIN_STATE: (state, payload) => {
            state.isLogin = payload;
        },
        SET_USER_PERMISSIONS: (state, payload) => {
            state.userPermissions = payload;
        }
    }, actions: {
        showLoading: ({commit}) => {
            commit('SHOW_LOADING', true);
        }, hideLoading: ({commit}) => {
            commit('SHOW_LOADING', false);
        },
        deleteDialog: async ({commit}, index) => {
            await commit('DELETE_DIALOG', {
                index: index, visible: true,
            });
        },
        logout: async ({commit}) => {
            localStorage.removeItem('Authorization');
            await commit('LOGOUT');
        },
        setUserInfo: async ({commit}, payload) => {
            await commit('SET_USER_INFO', payload);
        }, setPhoto: async ({commit}, payload) => {
            await commit('SET_PHOTO', payload);
        }, removePhoto: async ({commit}) => {
            await commit('REMOVE_PHOTO');
        }, isAuth: async () => {
            return !!localStorage.getItem('Authorization');
        },
        initSessionId: ({state}) => {
            state.sessionId = localStorage.getItem('sessionId')
        },
        setSessionId: ({state}, payload) => {
            localStorage.setItem('sessionId', payload)
            state.sessionId = payload;
        },
        login: ({state}, payload) => {
            localStorage.setItem('Authorization', payload.access_token);
            state.isLogin = true;
        },
    }
}