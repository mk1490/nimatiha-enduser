export default {
    state: {
        navbarMenu: true,
        toolbarAndFooterVisible: true,
    }, getters: {
        navbarMenu: (state) => state.navbarMenu,
        toolbarAndFooterVisible: (state) => state.toolbarAndFooterVisible,
    }, mutations: {
        SET_TOGGLE_NAVBAR: (state, payload) => {
            if (!payload) {
                state.navbarMenu = !state.navbarMenu;
            } else {
                state.navbarMenu = payload;
            }
        },
        SET_TOOLBAR_AND_FOOTER_VISIBLE: (state, payload) => {
            state.toolbarAndFooterVisible = payload;
        },
    }, actions: {
        toggleNavbar: (context, payload) => {
            context.commit('SET_TOGGLE_NAVBAR');
        },
    }
}