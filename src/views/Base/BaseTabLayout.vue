<script>
export default {
  name: "BaseTabLayout",
  props: {
    tabs: Array,
    value: Number,
    vertical: {
      type: Boolean,
      default: false,
    },
    buttonTitle: String,
    buttonVisible: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['buttonClick'],
  components: {},
  data() {
    return {
      selectedTab: this.value || 0,
    }
  },
  watch: {
    selectedTab: {
      handler() {
        this.$emit('input', this.selectedTab)
      }
    }
  }
}
</script>

<template>
  <v-container fluid>
    <div
        v-if="!vertical"
        class="v-row" style="margin: 0!important;">
      <div class="v-col-12">
        <v-tabs
            direction="horizontal"
            v-model="selectedTab">
          <v-tab v-for="item in tabs">
            <v-badge
                v-if="item.count"
                :content="item.count">
              {{ item.title }}
            </v-badge>
            <template v-else>
              {{ item.title }}
            </template>
          </v-tab>


        </v-tabs>
      </div>
      <div
          v-if="buttonTitle && buttonVisible"
          class="v-col">
        <v-btn
            @click="$emit('buttonClick')"
            color="primary">
          {{ buttonTitle }}
        </v-btn>
      </div>


      <div class="v-col-12">
        <v-tabs-window
            v-model="selectedTab"
            direction="horizontal">
          <v-tabs-window-item
              v-for="(item, index) in tabs">
            <slot :name="`tab-${index + 1}`"></slot>
            <component
                v-if="item.view"
                v-bind="item.data"
                :is="item.view">
            </component>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </div>
    <div v-if="vertical"
         class="d-flex flex-row">
      <div class="w-100 d-flex flex-row">
        <v-tabs
            v-model="selectedTab"
            color="primary"
            direction="vertical">
          <v-tab
              v-for="item in tabs">
            <v-badge
                v-if="item.count"
                :content="item.count">
              {{ item.title }}
            </v-badge>
            <template v-else>
              {{ item.title }}
            </template>

          </v-tab>
        </v-tabs>

        <v-tabs-window
            class="w-100"
            v-model="selectedTab">
          <v-tabs-window-item v-for="(item, index) in tabs">
            <slot :name="`tab-${index + 1}`"></slot>
            <component
                v-if="item.view"
                v-bind="item.data"
                :is="item.view">
            </component>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>

    </div>

  </v-container>
</template>

<style scoped>
.v-window {
  border-radius: 1rem !important;
}

::v-deep .v-tabs {
  background-color: transparent !important;
}
</style>

