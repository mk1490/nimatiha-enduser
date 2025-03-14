<script setup lang="ts">
import videojs from "video.js";
import defineLazyProperty = videojs.defineLazyProperty;

const _props = defineProps({
  label: String,
  icon: String,
  to: String,
  text: Boolean,
  small: Boolean,
  variant: String,
  buttonIsIcon: Boolean,
  color: {
    default: 'primary',
    type: String,
  },
  block: {
    default: false,
    type: Boolean,
  },
  menuItems: Array,
})
</script>

<template>
  <v-menu
      v-if="menuItems && menuItems.length > 0"
      top>
    <template v-slot:activator="{ props }">
      <v-btn
          v-bind="props"
          :icon="_props.buttonIsIcon"
          :text="_props.text"
          :small="_props.small"
          :block="_props.block"
          :color="_props.color">
        <v-icon>
          mdi-chevron-down
        </v-icon>
        {{ label }}
        <slot>
        </slot>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
          v-for="item in _props.menuItems"
          @click="item['click'](item)">
        <v-list-item-title>
          {{ item['title'] }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <v-btn
      v-if="!_props.menuItems"
      :block="_props.block"
      :text="_props.text"
      :to="to"
      :small="_props.small"
      :variant="_props.variant"
      class="white--text"
      @click="$emit('click')"
      :color="_props.color">
    <v-icon v-if="_props.icon">
      {{ _props.icon }}
    </v-icon>
    {{ _props.label }}
    <slot>
    </slot>
  </v-btn>
</template>

<style scoped>

</style>
