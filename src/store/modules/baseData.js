const baseData = {
    state: {
        initProjectTitle: null,
        selectedProjectId: null,
        uploadedDocuments: [],
        educationLevels:  [],
        maritalStatus: [],
        disabilityStatus: [],
        status: -1,
        name: '',
        family: '',
    }, getters: {
        initProjectTitle: (state) => state.initProjectTitle,
        status: (state) => state.status,
        name: (state) => state.name,
        family: (state) => state.family,
        educationLevels: (state) =>state.educationLevels,
        maritalStatus: (state) =>state.maritalStatus,
        disabilityStatus: (state) =>state.disabilityStatus,
    },

    mutations: {
        SET_INIT_PROJECT_TITLE: (state, payload) => {
            state.initProjectTitle = payload;
        },
        SET_UPLOADED_DOCUMENTS: (state, payload) => {
            state.uploadedDocuments = payload;
        },
        SET_STATUS: (state, payload) => {
            state.status = payload;
        },
        SET_STATUS_TEXT: (state, payload) => {
            state.statusText = payload;
        },
        SET_TOTAL_DEPOSITS: (state, payload) => {
            state.totalDeposits = payload;
        },
        SET_RANK: (state, payload) => {
            state.rank = payload;
        },
        SET_DEPOSIT_ITEMS: (state, payload) => {
            state.depositItems = payload;
        },
        SET_RANKING_ITEMS: (state, payload) => {
            state.rankingItems = payload;
        },
        SET_NAME: (state, payload) => {
            state.name = payload;
        },
        SET_PROFILE_SLIDERS: (state, payload) => {
            state.profileSliders = payload;
        },
        SET_FAMILY: (state, payload) => {
            state.family = payload;
        },
        SET_STOCK_ITEMS: (state, payload) => {
            state.stockItems = payload.map(f => {
                f['title'] = 'کد ' + f.stockCode;
                return f
            });
        },
        SET_PROFILE_LOADING_STATE: (state, payload) => {
            state.profileLoading = payload;
        },
        SET_PROJECT_ITEMS: (state, payload) => {
            state.projectItems = payload;
        },
        SET_PROJECT_ID: (state, payload) => {
            state.selectedProjectId = payload;
        },
        SET_STOCK_ID: (state, payload) => {
            state.selectedStockId = payload;
        },
        SET_STOCK_TITLE: (state, payload) => {
            state.selectedStockTitle = payload;
        },
        SET_TOGGLE_NAVBAR: (state, payload) => {
            if (!payload) {
                state.navbarMenu = !state.navbarMenu;
            } else {
                state.navbarMenu = payload;
            }

        },
        SET_PROJECT_NOTIFICATIONS: (state, payload) => {
            state.projectNotifications = payload;
        },
        SET_MENU_ITEMS: (state, payload) => {
            state.menuItems = payload
        },
        SET_DISABILITY_ITEMS: (state, payload) => {
            state.disabilityStatus = payload
        },
        SET_MARITAL_ITEMS: (state, payload) => {
            state.maritalStatus = payload
        },
        SET_EDUCATION_LEVEL_ITEMS: (state, payload) => {
            state.educationLevels = payload
        },
    }, actions: {
        setInitializeData: (context, payload) => {
            context.commit('SET_INIT_PROJECT_TITLE', payload.currentUserProjectTitle);
            context.commit('SET_PROJECT_ID', payload.currentUserProjectId);
            context.commit('SET_UPLOADED_DOCUMENTS', payload.uploadDocumentItems);
            if (payload.customerDeposit) {
                context.commit('SET_TOTAL_DEPOSITS', payload.customerDeposit);
            }
            context.commit('SET_STOCK_ITEMS', payload.stockItems);
            context.commit('SET_STATUS', payload.status);
            context.commit('SET_RANK', payload.rank);
            context.commit('SET_DEPOSIT_ITEMS', payload.depositItems);
            context.commit('SET_RANKING_ITEMS', payload.rankingItems);
            context.commit('SET_NAME', payload.name);
            context.commit('SET_PROJECT_ITEMS', payload.joinedProjectItems);
            if (payload.sliders) {
                context.commit('SET_PROFILE_SLIDERS', payload.sliders);
            }
            context.commit('SET_FAMILY', payload.family);
            if (payload.statusText) {
                context.commit('SET_STATUS_TEXT', payload.statusText);
            }
        },
        setProfileLoadingState: (context, payload) => {
            context.commit('SET_PROFILE_LOADING_STATE', payload);
        },
        setSelectedStockId: (context, payload) => {
            context.commit('SET_STOCK_ID', payload);
        },
        selectedStockTitle: (context, payload) => {
            context.commit('SET_STOCK_TITLE', payload);
        },
        setProjectNotifications: (context, payload) => {
            context.commit('SET_PROJECT_NOTIFICATIONS', payload);
        },
    },
};

export default baseData;
