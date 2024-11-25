<template>
  <v-app full-height class="bg-green-darken-4">
    <v-container class="container--fluid pa-0" style="height: 100%;">
      <div class="content fill-height d-flex align-items-center">
        <v-layout
            class="justify-center"
            fill-height
            align-center justify-center>
          <div class="d-inline-block align-self-center">

            <div
                v-if="isLogin === false"
                class="d-flex justify-center">
              <v-card width="300">
                <v-card-title class="text-center">
                  احراز هویت
                </v-card-title>
                <v-card-text>
                  <authentication
                      @authSuccess="authSuccess"/>
                </v-card-text>
              </v-card>
            </div>

            <div
                v-if="isLogin"
                class="d-flex justify-center">
              <v-card
                  :width="cardWidth"
                  class="elevation-0">
                <v-card-title class="text-center">
                  {{ title }}
                  <div
                      v-if="isLogin"
                      class="v-col-12 pt-0">
                    <small>
                      {{ phoneNumber }}
                    </small>
                    <div class="d-block">
                      <v-btn
                          @click="logout"
                          density="compact"
                          variant="text"
                          color="error">
                        خروج
                      </v-btn>
                    </div>
                  </div>
                </v-card-title>
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
                        @click:next="next"
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
              <registration-success-component
                  v-if="status == 1"
                  :tracking-code="trackingCode"
              />
            </div>

          </div>
        </v-layout>
      </div>
    </v-container>
  </v-app>
</template>

<script>


import RegistrationSuccessComponent from "@/view/components/Registration/Widgets/RegistrationSuccessComponent.vue";

import Authentication from "./Steps/Authentication.vue";
import {mapGetters} from 'vuex'
import DynamicStep from "@/view/components/Registration/Steps/DynamicStep.vue";

export default {
  name: "RegistrationPage",
  components: {
    DynamicStep,
    Authentication,
    RegistrationSuccessComponent
  },
  async created() {
    this.httpGet(`/core/initialize?slug=${this.$route.params.slug}`, result => {
      if (result.success === true) {
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
  data() {
    return {
      title: '',
      steps: [],
      vm: this,
      status: -1,
      isValid: false,
      selectedStep: 1,
      model: {}
    }
  },
  methods: {
    async submitFormAndSendToServer() {

      let payload = {...this.model};
      payload.initialCashAmount = this.convertAmountToPlainAmountValue(payload.initialCashAmount);
      payload.monthlyIncome = this.convertAmountToPlainAmountValue(payload.monthlyIncome);
      payload.monthlyInstallmentsAmount = this.convertAmountToPlainAmountValue(payload.monthlyInstallmentsAmount);
      payload.suggestedUsableArea = Number(payload.suggestedUsableArea);


      if (!await this.$refs.form.validate()) {
        this.$swal.fire({
          icon: 'warning',
          title: 'هشدار!',
          text: 'لطفا خطاهای بوجود آمده را برطرف نمایید!',
        })
        return;
      }

      this.httpPost(`/auth/register`, payload, (data) => {
        this.status = 1;
        this.trackingCode = data.trackingCode;
      });
    },
    logout() {
      localStorage.removeItem('accessToken');
      this.$store.commit('LOGIN_STATE', false)
      this.isAuth = false;
    },
    authSuccess() {
      this.$store.commit('LOGIN_STATE', true);
    },
    prev() {
      this.selectedStep--;
    },
    async next() {
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
          })
        } else {
          this.selectedStep++;
        }
      })
    }
  },
  computed: {
    ...
        mapGetters(['isLogin', 'phoneNumber']),
    cardWidth:

        function () {
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
  ,
}
</script>

<style scoped>

.background {
  height: 100vh;
  width: 100%;
  background-color: #0056b3;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  grid-column: 1/-1;
  grid-row: 1/-1;
}

</style>
