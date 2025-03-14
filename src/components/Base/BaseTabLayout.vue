<script>
import { useStore } from 'vuex'

export default {
  name: 'BaseTabLayout',
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
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      selectedTab: this.value || 0,
    }
  },
  watch: {
    selectedTab: {
      handler() {
        this.$emit('input', this.selectedTab)
      },
    },
  },
  computed: {
    finalTabs() {
      const dataStore = baseData()
      const tabs = []
      this.tabs.map(f => {
        if (!f.permission) {
          tabs.push(f)
        } else {
          console.log(dataStore.checkPermission(f.permission))
          if (dataStore.checkPermission(f.permission)) {
            tabs.push(f)
          }
        }
      })
      return tabs
    },
  },
}
</script>

<template>
  <v-container fluid>
    <div
      class="v-row" style="margin: 0!important;">
      <div class="v-col-auto">
        <v-tabs
          :direction="vertical? 'vertical': 'horizontal'"
          v-model="selectedTab">
          <v-tab v-for="item in finalTabs">
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


      <div class="v-col">
        <v-tabs-window
          v-if="vertical"
          :model-value="selectedTab">
          <v-tabs-window-item
            v-for="(item, index) in finalTabs">
            <slot :name="`tab-${index + 1}`"></slot>
            <component
              v-if="item.view"
              v-bind="item.data"
              :is="item.view">
            </component>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>


      <div class="v-col-12">
        <v-tabs-window
          v-if="!vertical"
          direction="horizontal"
          v-model="selectedTab">
          <v-tabs-window-item v-for="(item, index) in finalTabs">
            <v-container fluid>
              <slot :name="`tab-${index + 1}`"></slot>
            </v-container>
            <component
              v-if="item.view"
              v-bind="item.data"
              :is="item.view">
            </component>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>

      <!--      <div-->
      <!--        v-if="buttonTitle && buttonVisible">-->
      <!--        <v-btn-->
      <!--          @click="$emit('buttonClick')"-->
      <!--          color="primary">-->
      <!--          {{ buttonTitle }}-->
      <!--        </v-btn>-->
      <!--      </div>-->
    </div>

    <slot></slot>
  </v-container>
</template>

<style scoped>

</style>
