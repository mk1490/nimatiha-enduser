<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto">
    <template v-slot:activator="{ on, attrs }">
      <base-text-field
          :label="label"
          :value="computedDateFormattedMomentjs"
          dense
          filled
          readonly
          :disabled="disabled"
          :clearable="clearable"
          v-bind="attrs"
          v-on="on"
          @click:clear="clearTime"
          @click="menu.visible = true">

      </base-text-field>
    </template>
    <v-time-picker
        v-model="time">
      <v-spacer></v-spacer>
      <v-btn
          text
          color="primary"
          @click="menu = false"
      >
        لغو
      </v-btn>
      <v-btn
          text
          color="primary"
          @click="submit"
      >
        تأیید
      </v-btn>
    </v-time-picker>


    <!--        <date-picker-->
    <!--                v-model="date"-->
    <!--                format="YYYY-MM-DD HH:mm:ss"-->
    <!--                :type="hideTime ? 'date' : 'datetime'"-->
    <!--                :element="`time-input_${id}`"-->
    <!--                :range="range"-->
    <!--        />-->
  </v-menu>


</template>

<script>

export default {
  name: "BaseTimeTextField",
  components: {},
  created() {
    this.time = this.value;
  },
  data() {
    return {
      time: null,
      datePicker: false,
      menu: false,
    }
  },
  props: {
    id: String,
    label: String,
    value: undefined,
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
      this.$emit('input', null);
    },
    submit() {
      this.$refs.menu.save(this.time);
      this.$emit('input', this.time);
    }
  },
  computed: {
    computedDateFormattedMomentjs() {
      return this.time;
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
