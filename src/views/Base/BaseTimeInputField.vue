<template>
  <v-text-field
    :model-value="model"
    @update:model-value="$emit('input', model)"
    @keyup="$emit('keyup', model)"
    @keydown="$emit('keydown', model)"
    @click:clear="$emit('click:clear')"
    @focusin="$emit('focusin')"
    @focusout="$emit('focusout')"
    :label="label"
    :suffix="suffix"
    :prefix="prefix"
    :clearable="clearable"
    :prepend-icon="prependIcon"
    readonly
    :append-icon="appendIcon"
    :append-outer-icon="appendOuterIcon"
    :prepend-inner-icon="prependInnerIcon"
    @click:append="$emit('click:append')"
    :hide-details="hideDetails"
    variant="outlined"
    density="compact">
    <!--    <template v-slot:label>-->
    <!--      <div class="required&#45;&#45;symbol">-->
    <!--        {{ label }}-->
    <!--        <small v-if="requiredSymbol">*</small>-->
    <!--      </div>-->
    <!--    </template>-->


    <v-menu
      v-model="menu"
      z-index="99999"
      :close-on-content-click="false"
      activator="parent"
      transition="scale-transition">

      <v-card>
        <v-card-text>
          <v-time-picker
            v-model="model"
            format="24hr"
            title="تعیین زمان"
            full-width
          ></v-time-picker>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn>
            لغو
          </v-btn>
          <v-btn @click="submit">
            تأیید
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </v-text-field>
</template>

<script setup lang="ts">


import ScheduleShiftworkModal from '@/pages/SchoolManager/SheduleAndShiftworkGroups/ScheduleShiftworkModal.vue'

const emits = defineEmits(['click:append', '@click:clear', 'focusin', 'focusout', 'input', 'modelValue'])
const props = defineProps({
  value: undefined,
  vBind: undefined,
  vOn: undefined,
  label: String,
  suffix: String,
  prefix: String,
  prependIcon: String,
  appendIcon: String,
  appendOuterIcon: String,
  prependInnerIcon: String,
  rules: Array,
  disabled: Boolean,
  clearable: {
    type: Boolean,
    default: true,
  },
  hideDetails: {
    type: undefined,
    default: true,
  },
  requiredSymbol: {
    type: Boolean,
    default: false,
  },
  readonly: Boolean,
  type: undefined,
})

const model = ref(null)

const menu = ref(false)


function submit() {
  menu.value = false
  emits('update:modelValue', model.value)
}

// export default {
//
//   created() {
//     if (this.value) {
//       this.model = this.value
//     }
//   },
//
//   data() {
//     return {
//       model: null,
//     }
//   },
//   watch: {
//     value: {
//       handler(value) {
//         this.model = value
//       },
//     },
//   },
// }
</script>

<style scoped>

</style>
