<template>
  <div class="v-row">
    <div
        class="v-col-12">
      <div
          v-for="(item, index) in items"
          class="v-row pt-2">
        <div class="v-col-7">
          <base-text-field
              v-model="items[index].title"
              :label="'عنوان محصول شماره ' + (index + 1) "
          />
        </div>
        <div class="v-col">
          <base-select
              v-model="items[index].ownProduct"
              label="آیا محصول تولید خودتان است؟"
              :items="ownItems"
          />
        </div>
        <div class="v-col-auto me-3">
          <v-btn
              @click="removeItem(index)"
              color="red"
              size="36"
              icon="mdi-delete">
          </v-btn>
        </div>
      </div>
    </div>
    <div class="v-col-12 pb-5">
      <div class="d-flex justify-center">
        <v-btn
            @click="addItem"
            color="primary">
          <v-icon>
            mdi-plus
          </v-icon>
          اضافه کردن محصول جدید
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import BaseTextField from "../../../widget/Base/BaseTextField.vue";
import BaseSelect from "../../../widget/Base/BaseSelect.vue";

export default {
  name: "StepTwoProductItems",
  components: {BaseSelect, BaseTextField},
  emits: ['update:modelValue'],
  created() {
    this.httpGet(`/member-request/initialize/product-items`, result => {
      this.items = result;
    })
  },
  data() {
    return {
      items: [],
      ownItems: [
        {title: 'بلی', value: true},
        {title: 'خیر', value: false},
      ]
    }
  },
  methods: {
    addItem() {
      this.items.push({
        title: null,
        ownProduct: null
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
    }
  },
  watch: {
    'items': {
      handler(value) {
        this.$emit('update:modelValue', value);
      },
      deep: true,
    }
  }
}
</script>

<style scoped>

</style>