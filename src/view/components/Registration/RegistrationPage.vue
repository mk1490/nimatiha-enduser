<template>
  <v-app full-height class="bg-light-blue-accent-2">
    <v-container class="container--fluid pa-0" style="height: 100%;">
      <div class="content fill-height d-flex align-items-center">
        <v-layout
            class="justify-center"
            fill-height
            align-center justify-center>
          <div class="d-inline-block align-self-center">

            <div
                v-if="isAuth == false"
                class="d-flex justify-center">
              <v-card width="500">

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
                v-if="isAuth"
                class="d-flex justify-center">
              <v-card
                  :width="800"
                  title="فرم اطلاعات یاوران ولایت"
                  class="elevation-0">
                <v-card-text>
                  <v-stepper
                      hide-actions
                      :model-value="selectedStep"
                      flat
                      @update:modelValue="selectedStep = $event"
                      :items="[
                      'تکمیل اطلاعات فردی',
                      'مشخّصات والدین',
                      'وضعیت تحصیلی - آموزشی',
                      'سوابق اجرایی',
                      'سوابق آموزشی - فرهنگی',
                      'دوره‌های آموزشی',
                      ]"
                      alt-labels>

                    <v-stepper-window :model-value="selectedStep">

                      <v-stepper-window-item :value="1">
                        <step-one-general-information
                            @update:modelValue="model.personal = $event"/>
                      </v-stepper-window-item>


                      <v-stepper-window-item :value="2">
                        <parent-information
                            v-if="selectedStep === 2"
                            ref="parentInformation"
                        />
                      </v-stepper-window-item>
                      <v-stepper-window-item
                          :value="3">
                        <educational-status
                            v-if="selectedStep === 3"
                        />
                      </v-stepper-window-item>
                      <v-stepper-window-item
                          :value="4">
                        <executive-history
                            v-if="selectedStep === 4"
                        />
                      </v-stepper-window-item>
                      <v-stepper-window-item
                          :value="4">
                        <executive-history
                            v-if="selectedStep === 4"
                        />
                      </v-stepper-window-item>


                      <v-stepper-window-item
                          :value="5">
                        <educational-and-cultural-history
                            v-if="selectedStep === 5"
                        />
                      </v-stepper-window-item>

                      <v-stepper-window-item
                          :value="6">
                        <educational-courses
                            v-if="selectedStep === 6"
                        />
                      </v-stepper-window-item>
                    </v-stepper-window>


                    <v-stepper-actions
                        @click:next="next"
                        @click:prev="prev"
                        :disabled="false"
                        prev-text="قبلی"
                        :next-text="selectedStep === 5  ? 'ارسال' : 'بعدی'">

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
import FinalApproval from "@/view/components/Registration/Steps/FinalApproval.vue";
import ParentInformation from "@/view/components/Registration/Steps/ParentInformation.vue";
import EducationalStatus from "@/view/components/Registration/Steps/EducationalStatus.vue";
import ExecutiveHistory from "@/view/components/Registration/Steps/ExecutiveHistory.vue";
import EducationalAndCulturalHistory from "@/view/components/Registration/Steps/EducationalAndCulturalHistory.vue";
import EducationalCourses from "@/view/components/Registration/Steps/EducationalCourses.vue";


export default {
  name: "RegistrationPage",
  components: {
    EducationalCourses,
    EducationalAndCulturalHistory,
    ExecutiveHistory,
    EducationalStatus,
    ParentInformation,
    FinalApproval,
    Authentication,
    RegistrationSuccessComponent
  },
  async created() {
    /*this.httpGet(`/auth/initialize`, (data) => {
      this.items.projectItems = data.projects.map(f => {
        return {
          value: f.id,
          text: f.title,
        }
      });
      this.items.housingTypes = data.housingTypes;
    })*/
  },
  data() {
    return {
      isAuth: false,
      vm: this,
      status: -1,
      isValid: false,
      selectedStep: 3,
      trackingCode: null,
      model: {
        personal: {},
        productItems: [],
        market: {
          marketId: null,
          deskIds: [],
        }
      }
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
    onMethodConverted(event) {
      this.model.monthlyIncome = event;
    },
    authSuccess() {
      this.isAuth = true;
      this.selectedStep++;
    },
    prev() {
      this.selectedStep--;
    },
    next() {
      switch (this.selectedStep) {
        case 1: {
          this.httpPut(`/member-request/personal-information`, this.model.personal, () => {
            this.selectedStep++;
          })
          break;
        }
        case 2: {
          if (!this.$refs.uploadDocuments.validate()) {
            this.$toast.error('فایل‌های ضروری بارگذاری نشده‌اند')
            return
          }

          this.selectedStep++;
          break;
        }
        case 3: {
          this.httpPut(`/member-request/product-items`, {
            items: this.model.productItems
          }, () => {
            this.selectedStep++;
          })
          break;
        }
        case 4: {
          if (!this.$refs.marketSelection.validate())
            return;
          this.httpPut(`/member-request/market-selection`, this.model.market, () => {
            this.selectedStep++;
          })
          break;
        }
        case 5: {
          this.httpPost(`/member-request/final-approval`, {}, result => {
            this.$swal.fire({
              icon: 'success',
              text: 'درخواست شما با موفقیت ثبت شد.'
            }).then(() => {
              localStorage.removeItem('accessToken');
              this.selectedStep = 1;
              this.isAuth = false;
            })
          })
          break;
        }
      }

    }
  },
  computed: {
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
  },
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