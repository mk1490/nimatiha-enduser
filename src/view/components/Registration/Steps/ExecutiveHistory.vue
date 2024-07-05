<template>
  <v-form
      ref="form"
      v-model="isValid"
      lazy-validation>
    <v-container>
      <v-form ref="form">
        <div class="v-row">
          <div
              v-for="(item, index) in items"
              class="v-col-12">
            <v-checkbox
                hide-details
                :model-value="item.selected"
                @update:model-value="itemSelection(index, $event)"
                :label="item.title"
            />
            <div
                v-if="items[index].selected === true"
                class="v-row">
              <div
                  v-if="items[index].isOther === true"
                  class="v-col-12">

                <base-text-area
                    label="توضیحات"
                    v-model="items[index].description"
                />


              </div>
              <div class="v-col-md-6 v-col-sm-12">
                <base-text-field
                    v-model="items[index].post"
                    :rules="rules.post"
                    label="سمت"
                    required-symbol
                />
              </div>
              <div class="v-col-md-6 v-col-sm-12">
                <base-text-field
                    type="number"
                    v-model="items[index].postHistory"
                    :rules="rules.postHistory"
                    required-symbol
                    label="سابقه مسئولیت"/>
              </div>
            </div>

          </div>
        </div>
      </v-form>
    </v-container>
  </v-form>
</template>

<script>
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";
import BaseTextArea from "@/view/widget/Base/BaseTextArea.vue";

export default {
  name: "ExecutiveHistory",
  components: {BaseTextArea, BaseTextField},
  emits: ['update:modelValue'],
  created() {
    ['بسیج', 'انجمن اسلامی', 'هیأت مذهبی', 'هلال احمر', 'سازمان دانش‌آموزی', 'خبرگزاری پانا', 'سایر'].map((f, i) => {
      this.items.push({
        title: f,
        isOther: i === 6
      });
    })

    this.httpGet(`/member-request/initialize/executive`, result => {
      result.map((item) => {
        this.items[this.items.findIndex(x => x.title === item.title)] = {
          ...item,
          selected: true,
        }
      })
    })


  },
  data() {
    return {
      isValid: false,
      items: [],
      rules: {
        post: [v => !!v || 'تکمیل این فیلد اجباری است.'],
        postHistory: [v => !!v || 'تکمیل این فیلد اجباری است.']
      }
    }
  },
  methods: {
    itemSelection(index, event) {
      this.items[index].selected = event;
    },
    async validate() {
      return await this.$refs.form.validate()
    }
  },
  watch: {
    'items': {
      handler() {
        this.$emit('update:modelValue', this.items.filter(x => x.selected === true))
      },
      deep: true,
    }
  },
}
</script>
<style scoped>

</style>