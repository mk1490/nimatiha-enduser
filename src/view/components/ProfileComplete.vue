<script>
import BaseTextField from "@/view/widget/Base/BaseTextField.vue";
import BaseSelect from "@/view/widget/Base/BaseSelect.vue";
import BaseAutoComplete from "@/view/widget/Base/BaseAutoComplete.vue";
import {verifyIranianNationalId} from '@persian-tools/persian-tools'
import {mapGetters} from 'vuex'

export default {
  name: "ProfileComplete",
  components: {BaseAutoComplete, BaseSelect, BaseTextField},
  computed: {
    ...mapGetters(['profileData']),
    zoneShow() {
      if (this.model.city) {
        const cityItem = this.items.cities.find(x => x.value === this.model.city);
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
  created() {
    this.httpGet(`/auth/initialize`, result => {
      this.items.educationLevel = result.educationLevels;
      this.items.zones = result.zones;
      this.items.cities = result.cities;
      const profileData = this.$store.getters.profileData;
      if (profileData) {
        this.setModel(profileData);
      }
    })
  },
  data() {
    return {
      model: {
        name: null,
        family: null,
        nationalCode: null,
        schoolName: null,
        educationLevel: null,
        city: null,
        zone: null,
      },
      items: {
        educationLevel: [],
        cities: [],
        zones: [],
      },
      rules: {
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
  methods: {
    async submit() {
      const isValid = await this.$refs.form.validate()
      if (!isValid.valid)
        return;
      this.httpPost(`/auth/update-profile`, this.model, result => {
        this.$toast.success('تکمیل پروفایل با موفقیت انجام شد.')
        this.$store.commit('SET_PROFILE_STATUS', 1)
        this.$router.push({
          path: '/'
        })
      }, error => {

      })
    },
    setModel(profileData) {
      this.model.name = profileData.name;
      this.model.family = profileData.family;
      this.model.city = profileData.city;
      this.model.zone = profileData.zone;
      this.model.schoolName = profileData.schoolName;
      this.model.nationalCode = profileData.nationalCode;
      this.model.educationLevel = profileData.educationLevel;
    }
  },
  watch: {
    'profileData': {
      handler(value) {
        this.setModel(value);
      }
    }
  }
}
</script>

<template>
  <v-container class="d-flex justify-center">
    <v-card width="500">
      <v-card-title>
        تکمیل پروفایل
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <div class="v-row">
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
                  :items="items.educationLevel"
                  required-symbol
                  label="پایه تحصیلی"
              />
            </div>
            <div class="v-col-12">
              <base-auto-complete
                  v-model="model.city"
                  :rules="rules.city"
                  :items="items.cities"
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
                  :items="items.zones"
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
  </v-container>
</template>

<style scoped>

</style>
