<script>
import RegistrationSuccessComponent from "../Registration/Widgets/RegistrationSuccessComponent.vue";
import {mapGetters} from "vuex";
import DynamicStep from "../Registration/Steps/DynamicStep.vue";
import ProfileCompleteForm from "@/view/components/Shared/ProfileCompleteForm.vue";

export default {
  name: "Questionnaire",
  components: {ProfileCompleteForm, DynamicStep, RegistrationSuccessComponent},
  created() {
    this.httpGet(`/core/initialize?slug=${this.$route.params.slug}`, result => {
      if (result.success === true) {
        if (result.authRequired && !this.isLogin) {
          this.$router.push({
            name: 'complete-profile',
            query: {
              redirectTo: this.$route.fullPath,
            }
          })
          return;
        }
        this.title = result['questionnaireTitle'];
        localStorage.setItem('testId', result['questionnaireId']);
        if (this.$store.getters.isLogin) {
          this.$store.commit('LOGIN_STATE', true)
          this.$store.commit('SET_MOBILE_NUMBER', result.mobileNumber)
        }
        this.steps = result.levels;
      } else {
        this.$swal.fire({
          icon: 'error',
          text: result.message,
          showConfirmButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
        })
      }
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.push({
        name: 'auth'
      })
    },
    prev() {
      this.selectedStep--;
    },
    async nextOrSubmit() {
      if (!await this.$refs[`form_${this.selectedStep - 1}`][0].validate()) {
        this.$toast.error('لطفا خطاهایی که در فرم وجود دارد را برطرف نمایید.')
        return
      }
      let payload = {}
      Object.keys(this.model).map(f => {
        Object.keys(this.model[f]).map(fieldItem => {
          payload[fieldItem] = this.model[f][fieldItem];
        })
      })


      this.httpPost(`/form-answer/${this.steps[this.selectedStep - 1].id}`, this.model[this.steps[this.selectedStep - 1].id], result => {
        if (this.selectedStep === this.steps.length) {
          this.$swal.fire({
            icon: 'success',
            text: 'درخواست شما با موفقیت ثبت شد.'
          }).then(() => {
            localStorage.removeItem('accessToken');
            this.selectedStep = 1;
            this.$store.commit('LOGIN_STATE', false);
            window.reload();
          })
        } else {
          this.selectedStep++;
        }
      })
    }
  },
  data() {
    return {
      selectedStep: 1,
      steps: [],
      model: {},
      title: '',
    }
  },
  computed: {
    ...mapGetters(['phoneNumber']),
    cardWidth: function () {
      switch (this.$vuetify.display.name) {
        case 'xl':
        case 'lg':
          return 1000;
        case 'md':
          return 700;
        case 'xs':
          return 300
        default:
          return 500;
      }
    }
  }
}
</script>

<template>
  <div
      class="d-flex justify-center">
    <v-card
        :width="cardWidth"
        class="elevation-0">
      <v-card-text>
        <v-stepper
            hide-actions
            :model-value="selectedStep"
            position="relative"
            flat
            :mobile="$vuetify.display.mobile"
            @update:modelValue="selectedStep = $event"
            :items="steps"
            alt-labels>
          <v-stepper-window
              :model-value="selectedStep">
            <v-stepper-window-item
                v-for="(item, index) in steps"
                :value="index +1 ">
              <dynamic-step
                  v-if="index === selectedStep -1"
                  :ref="`form_${index}`"
                  v-model="model[steps[selectedStep -1].id]"
                  :form-items="item.formItems"
              />
            </v-stepper-window-item>


          </v-stepper-window>


          <v-stepper-actions
              @click:next="nextOrSubmit"
              @click:prev="prev"
              :disabled="false"
              prev-text="قبلی"
              :next-text="selectedStep === steps.length  ? 'ارسال' : 'بعدی'">
            <template v-slot:prev>
              <v-btn v-if="selectedStep !== 1"
                     @click="prev"
              >
                قبلی
              </v-btn>
              <v-spacer/>
            </template>
          </v-stepper-actions>
        </v-stepper>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>

</style>
