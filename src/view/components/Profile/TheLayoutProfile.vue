<template>
  <v-app id="inspire">

    <v-app-bar
        :height="toolbarHeight"
        app
        flat>
      <v-container class="py-0 fill-height">
        <div class="v-row">
          <div class="v-col-8">
            <v-menu
                max-width="300"
                offset-y
                bottom>
              <template v-slot:activator="{props}">
                <div
                    v-bind="props"
                    class="toolbar-profile-area">
                  <v-avatar
                      class="ml-2"
                      size="40">
                    <v-img
                        src="../../../../public/images/avatar.png"
                    />
                  </v-avatar>
                  <strong>
                    سلام
                    {{ name }}
                    عزیز!
                  </strong>
                  <v-icon>
                    mdi-chevron-down
                  </v-icon>
                </div>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>
                    {{ name + ' ' + family }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleLogout">
                  <v-list-item-title>
                    <v-icon>
                      mdi-logout
                    </v-icon>
                    خروج از حساب کاربری
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="v-col">
            <div class="d-flex justify-start justify-md-end justify-lg-end justify-sm-end justify-xs-center">
              <label class="align-self-center">
                پروژه:
              </label>
              <base-select
                  v-if="projectItems.length > 0"
                  hide-details
                  density="compact"
                  variant="solo"
                  color="transparent"
                  class="mr-4"
                  item-text="title"
                  item-value="id"
                  :items="projectItems"
                  :model-value="selectedProject"
                  full-width
                  flat
                  chips
                  @update:modelValue="projectSelection"
                  style="max-width: 120px"
                  persistent-hint
              />
            </div>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <v-container
        fluid
        v-if="status !== 102"
        style="margin-top: 2.5rem">
      <router-view/>
      <the-layout-profile-navigation-bottom
          @clickItem="clickBottomItem"/>
    </v-container>

    <status-page
        v-if="status === 102"
    />
  </v-app>
</template>

<script>

import {mapGetters} from "vuex";
import StatusPage from "@/view/components/Profile/StatusPage.vue";
import TheLayoutProfileNavigationBottom from "@/view/components/Profile/TheLayoutProfileNavigationBottom.vue";
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";

export default {
  name: "TheLayoutProfile",
  computed: {
    ...mapGetters(["name", "family", 'status', 'stockItems', 'projectItems']),
    links() {
      let items = [
        {
          text: 'خانه',
          route: '/'
        },
      ];
      const s = this.$store.getters.status;
      if (s != 102) {
        items.push({
          text: 'داشبورد',
          route: '/profile/dashboard'
        })
      }

      return items
    },
    toolbarHeight: function () {
      return this.$vuetify.display.smAndDown ? 130 : 56
    }


  },
  components: {BaseSelect, TheLayoutProfileNavigationBottom, StatusPage},
  created() {
    this.emitter.on('onStockSelection', (data) => {
      localStorage.setItem(`${this.selectedProject}_selectedStock`, data);
      this.selectedStock = data;
      this.initializeData();
    })
    this.selectedStock = localStorage.getItem(`${this.selectedProject}_selectedStock`);

    this.initializeData();
    switch (this.$store.getters.status) {
      case 101:
        this.$router.push({
          name: 'uploadDocuments'
        })
        break;
    }
  },
  data: () => ({
    modal: {
      financial: {
        visible: false,
      }
    },
    selectedProject: null,
  }),
  methods: {
    async handleLogout() {
      await this.$store.dispatch('logout')
      localStorage.removeItem(`${this.selectedProject}_selectedStock`)
      this.$router.push({
        name: 'Home'
      })
    },
    async initializeData() {
      const auth = localStorage.getItem('Authorization')
      let selectedProject = this.selectedProject || localStorage.getItem('selectedProject');
      let selectedStock = localStorage.getItem(`${selectedProject}_selectedStock`);
      if (selectedStock != null) {
        if (!this.stockItems.includes(x => x.id === selectedStock)) {
          // selectedStock = this.stockItems[0].id;
        }
      }
      await this.$store.dispatch('setProfileLoadingState', true)
      this.httpGet(this.serverAddress + `/api/enduser/auth/profile?projectId=${selectedProject ? selectedProject : ''}&stockId=${selectedStock ? selectedStock : ''}`, async (data) => {
        await this.$store.dispatch('setInitializeData', data);
        await this.$store.dispatch('setProfileLoadingState', false);
        await this.$store.dispatch('setSelectedStockId', data.currentStockId)
        await this.$store.dispatch('selectedStockTitle', data.currentStockTitle)
        await this.$store.dispatch('setProjectNotifications', data.projectNotifications)
        localStorage.setItem('selectedProject', data.currentUserProjectId)
        this.selectedProject = data.currentUserProjectId;
        // this.$store.commit('SET_PROFILE_LOADING_STATE', false)
      })
    },
    async clickBottomItem(target) {
      switch (target) {
        case 'deposit':
          this.modal.financial.visible = true;
          break;
        case 'home':
          this.$router.push({
            name: 'Home'
          })
          break;
      }
    },
    projectSelection() {
      if (!this.selectedProject)
        return;
      localStorage.setItem('selectedProject', this.selectedProject);
      this.initializeData()
    },
  }
}
</script>

<style scoped>
.toolbar-profile-area {
  font-family: VazirmatnUIFD, serif;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.toolbar-profile-area strong {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.container--fluid {
  width: 80% !important;
  @media (max-width: 480px) {
    width: 90% !important;
  }
  @media (max-width: 768px) {
    width: 90% !important;
  }
  @media (max-width: 1024px) {
    width: 90% !important;
  }
}

::v-deep .footer-container .v-card {
  border-radius: 30px !important;
}

::v-deep .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat) > .v-input__control > .v-input__slot {
  box-shadow: none !important;
}

:deep(.v-application__wrap) {
  background-color: #EEEEEE !important;
}

</style>