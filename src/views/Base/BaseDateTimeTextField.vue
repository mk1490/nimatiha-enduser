<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto">
    <template v-slot:activator="{props}">
      <base-text-field
          :label="label"
          :model-value="computedDateFormattedMomentJs"
          :disabled="disabled"
          :clearable="clearable"
          v-bind="props"
          :required-symbol="requiredSymbol"
          prepend-inner-icon="mdi-calendar-clock"
          @click:clear="clearTime"
          @click="menu = true"/>
    </template>

    <v-card>
      <v-card-text>
        <v-date-picker
            ref="datePicker"
            v-model="date"
            :range="range"/>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            @click="menu = false"
        >
          لغو
        </v-btn>
        <v-btn
            color="primary"
            @click="submit()">
          تأیید
        </v-btn>
      </v-card-actions>


    </v-card>
  </v-menu>


</template>

<script>
import {getPersianTime} from "@/plugins/commonMethods/commonMethods";

export default {
  name: "BaseDateTimeTextField",
  components: {},
  created() {
    this.date = this.modelValue;
  },
  data() {
    return {
      date: null,
      datePicker: false,
      menu: false,
    }
  },
  props: {
    id: String,
    label: String,
    requiredSymbol: {
      type: Boolean,
      default: false,
    },
    modelValue: undefined,
    hideTime: {
      type: Boolean,
      default: false,
    },
    range: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    clearTime() {
      this.date = null;
      this.$emit('update:modelValue', null);
    },
    submit() {
      this.$emit('update:modelValue', this.date);
      this.menu = false;
    }
  },
  computed: {
    computedDateFormattedMomentJs() {
      const format = 'YYYY/MM/DD'
      if (Array.isArray(this.date)) {
        if (this.date.length > 1) {
          return this.date ? `${getPersianTime(this.date[0], format)} الی ${getPersianTime(this.date[1], format)}` : '';
        }
        return this.date ? `${getPersianTime(this.date, format)}` : '';
      }
      return this.date ? `${getPersianTime(this.date, format)}` : '';
    },
  },
  watch: {
    date: {
      handler(value) {

      }
    }
  }
}
</script>

<style scoped>

</style>
