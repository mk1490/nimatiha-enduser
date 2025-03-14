<template>
  <div>
    <template v-if="text">
      <v-tooltip
        v-if="text"
        :color="color"
        location="bottom">
        <template v-slot:activator="{props}">
          <v-btn
            class="sqaure-btn"
            @click="$emit('click')"
            :color="color"
            :disabled="disabled"
            v-bind="props">
            <v-icon
              size="18"
              color="white">
              {{ icon }}
            </v-icon>
          </v-btn>
        </template>
        <span v-if="!!$slots.default">{{ text }}</span>
        <slot>
          {{ text }}
        </slot>
      </v-tooltip>

    </template>
    <template v-else>
      <v-btn
        class="sqaure-btn"
        @click="$emit('click')"
        :color="color"
        :disabled="disabled">
        <v-icon
          color="white">
          {{ icon }}
        </v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script>
export default {
  name: 'BaseSquareButton',
  emits: ['click'],
  props: {
    icon: String,
    text: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
    },
  },
}
</script>

<style scoped>

</style>
