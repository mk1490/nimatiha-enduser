export default {
    state: {
        navbarMenu: true,

    }, getters: {
        navbarMenu: (state) => state.navbarMenu,
    }, mutations: {
        SET_TOGGLE_NAVBAR: (state, payload) => {
            if (!payload) {
                state.navbarMenu = !state.navbarMenu;
            } else {
                state.navbarMenu = payload;
            }

        },
    }, actions: {
        toggleNavbar: (context, payload) => {
            context.commit('SET_TOGGLE_NAVBAR');
        },
    }
}