<template>
  <div class="footer">
    <div class="footer-container">
      <v-card
          height="80">
        <div class="d-inline-flex navigation-bottom-menu" style="align-items: center">
          <div class="v-row">
            <div
                v-for="item in items"
                @click="clickBottomMenu(item.target)"
                class="v-col clickable-item">
              <div class="d-inline-block">
                <button class="button-area-icon" style="place-items: center">
                  <v-icon
                      size="28"
                      color="#FABD32">
                    {{ item.icon }}
                  </v-icon>
                </button>

              </div>
              <div>
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>

export default {
  name: "TheLayoutProfileNavigationBottom",
  emits: ['clickItem'],
  methods: {
    clickBottomMenu(target) {
      this.emitter.emit('onBottomMenuClick', target)
      this.$emit('clickItem', target)
    }
  },
  data() {
    return {
      items: [
        {
          title: 'خانه',
          icon: 'mdi-home',
          target: 'home'
        },
        {
          title: 'سوابق واریزی',
          icon: 'mdi-currency-rial',
          target: 'deposit'
        },
      ]
    }
  }
}
</script>

<style scoped>

.footer {
  display: flex;
  position: fixed;
  justify-content: center;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  z-index: 11;
}

.footer-container {
  width: 80%;
  justify-content: center;

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

.navigation-bottom-menu {
  width: 100%;
  height: 100%;
  font-family: VazirmatnUIFD, serif;
  font-size: 0.9rem;
  color: #2f2f2f;
}

.clickable-item {
  cursor: pointer;
}

.button-area-icon {
  background-color: #F5F4F2;
  width: 40px;
  height: 40px;
  border-radius: 1.2em;
  display: flex;
  justify-content: center;
}
</style>