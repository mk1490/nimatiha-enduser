<script>
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";
import BaseAutoComplete from "@/view/widget/Base/BaseAutoComplete.vue";
import {digitsFaToEn, verifyIranianNationalId} from "@persian-tools/persian-tools";

export default {
  name: "ProfileCompleteForm",
  components: {BaseAutoComplete, BaseSelect, BaseTextField},
  props: {
    modelValue: Object,
    initialize: Object,
    mobileNumberVisible: Boolean,
  },
  emits: ['update'],
  created() {
    if (this.modelValue) {
      this.setModel(this.modelValue)
    }
  },
  methods: {
    setModel(profileData) {
      this.model.name = profileData.name;
      this.model.family = profileData.family;
      this.model.city = profileData.city;
      this.model.zone = profileData.zone;
      this.model.schoolName = profileData.schoolName;
      this.model.nationalCode = profileData.nationalCode;
      this.model.educationLevel = profileData.educationLevel;
    },
    async submit() {
      const isValid = await this.$refs.form.validate()
      if (!isValid.valid)
        return;
      this.httpPost(`/auth/update-profile`, this.model, result => {
        this.$emit('update', result);
        this.$toast.success('تکمیل پروفایل با موفقیت انجام شد.')
        this.$store.commit('SET_PROFILE_STATUS', 1)
      }, error => {

      })
    }
  },
  data() {
    return {
      model: {
        name: null,
        mobileNumber: null,
        family: null,
        nationalCode: null,
        schoolName: null,
        educationLevel: null,
        city: null,
        zone: null,
      },
      rules: {
        mobileNumber: [
          v => !!v || 'تکمیل این فیلد اجباری است.',
          v => v && v.length <= 11 || 'شماره تلفن همراه نمی‌تواند بیشتر از 11 رقم باشد.',
          v => v && v.length >= 10 || 'شماره تلفن همراه نمی‌تواند کمتر از 11 رقم باشد.',
        ],
        name: [v => !!v || "تکمیل این فیلد اجباری است."],
        family: [v => !!v || "تکمیل این فیلد اجباری است."],
        nationalCode: [
          v => !!v || "تکمیل این فیلد اجباری است.",
          v => !!v && verifyIranianNationalId(v) || 'کد ملّی وارد شده معتبر نیست.'
        ],
        schoolName: [v => !!v || "تکمیل این فیلد اجباری است."],
        educationLevel: [v => !!v || "تکمیل این فیلد اجباری است."],
        city: [v => !!v || "تکمیل این فیلد اجباری است."],
        zone: [v => !!v || "تکمیل این فیلد اجباری است."],
      }
    }
  },
  computed: {
    zoneShow() {
      if (this.model.city) {
        const cityItem = this.initialize.cities.find(x => x.value === this.model.city);
        if (cityItem) {
          if (cityItem.title === 'مشهد') {
            return true;
          }
          return false;
        }
        return false;
      }
    }
  },
  watch: {
    model: {
      handler(event) {
        if (event) {
          let payload = {...event};
          this.$emit('update:modelValue', payload);
        }
      },
      deep: true,
    }
  }
}
</script>

<template>
  <v-card width="500">
    <v-card-title>
      تکمیل پروفایل
    </v-card-title>

    <v-card-text>
      <v-form ref="form">
        <div class="v-row">
          <div
              v-if="mobileNumberVisible"
              class="v-col-12">
            <base-text-field
                v-model="model.mobileNumber"
                :rules="rules.mobileNumber"
                required-symbol
                dir="ltr"
                type="tel"
                label="تلفن همراه"
            />
          </div>
          <div class="v-col-12">
            <base-text-field
                v-model="model.name"
                :rules="rules.name"
                required-symbol
                label="نام"
            />
          </div>
          <div class="v-col-12">
            <base-text-field
                v-model="model.family"
                :rules="rules.family"
                required-symbol
                label="نام خانوادگی"
            />
          </div>
          <div class="v-col-12">
            <base-text-field
                v-model="model.nationalCode"
                :rules="rules.nationalCode"
                dir="ltr"
                type="tel"
                required-symbol
                label="کد ملّی"
            />
          </div>
          <div class="v-col-12">
            <base-text-field
                v-model="model.schoolName"
                :rules="rules.schoolName"
                required-symbol
                label="نام مدرسه"
            />
          </div>
          <div class="v-col-12">
            <base-select
                v-model="model.educationLevel"
                :rules="rules.educationLevel"
                :items="initialize['educationLevels']"
                required-symbol
                label="پایه تحصیلی"
            />
          </div>
          <div class="v-col-12">
            <base-auto-complete
                v-model="model.city"
                :rules="rules.city"
                :items="initialize['cities']"
                chips
                small-chips
                required-symbol
                label="شهرستان"
            />
          </div>
          <div
              v-if="zoneShow"
              class="v-col-12">
            <base-select
                v-model="model.zone"
                :rules="rules.zone"
                :items="initialize['zones']"
                required-symbol
                label="ناحیه آموزش و پرورش"
            />
          </div>
        </div>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn
          @click="submit"
          variant="flat">
        ذخیره
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
