<template>
  <div class="width-100">
    <div class="d-block">
      <v-select
          :width="width"
          :model-value="model"
          @update:modelValue="updateModelValue"
          @click:clear="$emit('click:clear')"
          @focusin="$emit('focusin')"
          @focusout="$emit('focusout')"
          :label="label"
          :items="items"
          :rules="rules"
          :multiple="multiple"
          :item-text="itemText"
          :item-value="itemValue"
          :deletable-chips="deletableChips"
          :hide-details="rules && rules.length> 0 ? 'auto' : hideDetails"
          :chips="chips"
          :clearable="clearable"
          :small-chips="smallChips"
          filled
          :return-object="returnObject"
          :disabled="disabled"
          :variant="variant"
          :dense="dense">

        <template
            v-if="$slots.item"
            v-slot:item="{item, index}">
          <slot
              name="item" :item="(item)" :index="index"></slot>
        </template>

        <template v-slot:label>
          <div class="required--symbol">
            {{ label }}
            <small v-if="finalRequiredSymbol">*</small>
          </div>
        </template>
      </v-select>
      <div
          v-if="description"
          dir="rtl"
          class="d-block field-description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  emits: ['@click:clear', 'focusin', 'focusout', 'update:modelValue'],
  props: {
    modelValue: String,
    width: {
      type: Number,
      default: undefined
    },
    returnObject: Boolean,
    label: String,
    description: String,
    items: Array,
    rules: Array,
    multiple: {
      default: false,
      type: Boolean,
    },
    deletableChips: {
      default: false,
      type: Boolean,
    },
    chips: {
      default: false,
      type: Boolean,
    },
    hideDetails: {
      type: undefined,
      default: true,
    },
    smallChips: {
      default: false,
      type: Boolean,
    },
    requiredSymbol: {
      default: false,
      type: Boolean,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    variant: {
      type: String,
      default: 'outlined',
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    itemText: String,
    itemValue: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      model: null,
    }
  },
  mounted() {
    this.model = this.modelValue;
  },
  computed: {
    finalRequiredSymbol() {
      if (this.rules && this.rules.length > 0) {
        return true;
      } else {
        return this.requiredSymbol;
      }
    }
  },
  watch: {
    'modelValue': {
      handler(value) {
        this.model = value;
      },
    },
  },
  methods: {
    updateModelValue(event) {
      this.model = event;
      console.log("UPDATE MODEL VALUE", event)
      this.$emit('update:modelValue', event)
    }
  }
}
</script>

<style scoped>

</style>
