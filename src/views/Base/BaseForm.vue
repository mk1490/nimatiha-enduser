<script>
export default {
  name: "BaseForm",
  props: {
    items: Array,
    modelValue: Object,
  },
  data() {
    return {
      model: {}
    }
  },
  watch: {
    'model': {
      handler(value) {
        this.$emit('update:modelValue', value)
      },
      deep: true,
    },
    modelValue: {
      immediate: true,
      handler(value) {
        if (value) {
          const keys = Object.keys(value);
          keys.map(f => {
            this.model[f] = value[f];
          })
        }
      },
      deep: true,
    },
  },
}
</script>

<template>
  <v-form ref="form">
    <div class="v-row">
      <div
          :class="`v-col-${item.col || 12}` + ` ${!!item.paddingRight? ` pr-${item.paddingRight}`: ''}`"
          v-for="item in items">

        <div
            v-if="['text', 'email'].includes((item.type || 'text'))"
            class="v-row">
          <div class="v-col">
            <base-text-field
                :label="item.label"
                v-model="model[item.key]"
                :required-symbol="item.required"
                :dir="!item.dir ? 'rtl': item.dir"
            />
          </div>

          <div
              v-if="item.deletable"
              class="v-col-auto">
            <base-sqaure-button
                @click="item.deleteClick(item)"
                color="red"
                text="حذف"
                icon="mdi-delete"/>
          </div>
        </div>

        <base-select
            v-if="item.type === 'select'"
            :label="item.label"
            :items="item.items"
            :multiple="item.multiple"
            v-model="model[item.key]"
            :required-symbol="item.required"
        />
        <v-checkbox
            v-if="item.type === 'checkbox'"
            :label="item.label"
            v-model="model[item.key]"
            hide-details
        />
        <base-text-area
            v-if="item.type === 'textArea'"
            :class="`${item.marginRight ? `mr-${item.marginRight}` : ''}`"
            :label="item.label"
            :dir="!item.dir ? 'rtl': item.dir"
            v-model="model[item.key]"
        />

        <label v-if="item.type ==='label'">
          {{ item.label }}
        </label>

        <v-btn
            v-if="item.type ==='button'"
            @click="item.click(item)">
          <v-icon>
            {{ item.icon || 'mdi-add' }}
          </v-icon>
          {{ item.label }}
        </v-btn>


        <template
            v-if="item.type === 'menu'"
        >
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  :ripple="false"
                  v-bind="attrs"
                  v-on="on">
                {{ item.label }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                  v-for="listItem in item.items"
                  @click="item.click(listItem)">
                <v-list-item-title>
                  {{ listItem.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>

          </v-menu>
        </template>

      </div>
    </div>
  </v-form>
</template>

<style scoped>

</style>
