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
                v-if="isLogin == false"
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
                  title="ثبت نام یاوران ولایت"
                  class="elevation-0">
                <v-card-text>
                  <v-stepper
                      hide-actions
                      :model-value="selectedStep"
                      position="relative"
                      flat
                      :mobile="$vuetify.display.mobile"
                      @update:modelValue="selectedStep = $event"
                      :items="headers"
                      alt-labels>
                    <v-stepper-window
                        :model-value="selectedStep">
                      <v-stepper-window-item :value="1">
                        <step-one-general-information
                            ref="generalInformation"
                            v-if="selectedStep === 1"
                            @update:modelValue="model.personal = $event"/>
                      </v-stepper-window-item>


                      <v-stepper-window-item :value="2">
                        <parent-information
                            v-if="selectedStep === 2"
                            ref="parentInformation"
                            @update:modelValue="model.parent = $event"
                        />
                      </v-stepper-window-item>
                      <v-stepper-window-item
                          :value="3">
                        <educational-status
                            v-if="selectedStep === 3"
                            ref="educationalStatus"
                            @update:modelValue="model.educational = $event"
                        />
                      </v-stepper-window-item>
                      <v-stepper-window-item
                          :value="4">
                        <executive-history
                            ref="executiveHistory"
                            v-if="selectedStep === 4"
                            @update:modelValue="model.executive = $event"
                        />
                      </v-stepper-window-item>

                      <v-stepper-window-item
                          :value="5">
                        <educational-and-cultural-history
                            v-if="selectedStep === 5"
                            ref="educationalAndCulturalHistory"
                            @update:modelValue="model.educationalAndHistorical = $event"

                        />
                      </v-stepper-window-item>

                      <v-stepper-window-item
                          :value="6">
                        <educational-courses
                            v-if="selectedStep === 6"
                            @update:modelValue="model.educationalCourses = $event"
                        />
                      </v-stepper-window-item>
                    </v-stepper-window>


                    <v-stepper-actions
                        @click:next="next"
                        @click:prev="prev"
                        :disabled="false"
                        prev-text="قبلی"
                        :next-text="selectedStep === 6  ? 'ارسال' : 'بعدی'">
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
import ParentInformation from "@/view/components/Registration/Steps/ParentInformation.vue";
import EducationalStatus from "@/view/components/Registration/Steps/EducationalStatus.vue";
import ExecutiveHistory from "@/view/components/Registration/Steps/ExecutiveHistory.vue";
import EducationalAndCulturalHistory from "@/view/components/Registration/Steps/EducationalAndCulturalHistory.vue";
import EducationalCourses from "@/view/components/Registration/Steps/EducationalCourses.vue";
import StepOneGeneralInformation from "@/view/components/Registration/Steps/StepOneGeneralInformation.vue";
import {mapGetters} from 'vuex'

export default {
  name: "RegistrationPage",
  components: {
    StepOneGeneralInformation,
    EducationalCourses,
    EducationalAndCulturalHistory,
    ExecutiveHistory,
    EducationalStatus,
    ParentInformation,
    Authentication,
    RegistrationSuccessComponent
  },
  async created() {

  },
  data() {
    return {
      headers: [
        'تکمیل اطلاعات فردی',
        'مشخّصات والدین',
        'وضعیت تحصیلی - آموزشی',
        'سوابق اجرایی',
        'سوابق آموزشی - فرهنگی',
        'دوره‌های آموزشی',
      ],
      vm: this,
      status: -1,
      isValid: false,
      selectedStep: 2,
      trackingCode: null,
      model: {
        personal: {},
        parent: {},
        educational: {},
        educationalAndHistorical: {},
        educationalCourses: {},
        executive: {},
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
    click() {
    },
    authSuccess() {
      this.$store.commit('LOGIN_STATE', true)
      this.selectedStep++;
    },
    prev() {
      this.selectedStep--;
    },
    getTitle(v) {
      console.log(v)
    },
    async next() {
      switch (this.selectedStep) {
        case 1: {
          const {valid} = await this.$refs.generalInformation.validate()
          if (!valid)
            return;

          let payload = {...this.model.personal};
          payload.slug = this.$route.params.slug
          this.httpPut(`/member-request/personal-information`,payload , () => {
            this.selectedStep++;
          })
          break;
        }
        case 2: {
          const {valid} = await this.$refs.parentInformation.validate()
          if (!valid) {
            return;
          }
          this.httpPut(`/member-request/parent-information`, {
            fatherName: this.model.parent.father.name,
            fatherFamily: this.model.parent.father.family,
            fatherEducationLevel: this.model.parent.father.educationLevel,
            fatherEducationLevelFifeSituation: this.model.parent.father.lifeSituation,
            motherName: this.model.parent.mother.name,
            motherFamily: this.model.parent.mother.family,
            motherEducationLevel: this.model.parent.mother.educationLevel,
            motherEducationLevelFifeSituation: this.model.parent.mother.lifeSituation,
            singleChild: this.model.parent.singleChild,
            familyMembers: Number(this.model.parent.familyMembers),

          }, () => {
            this.selectedStep++;
          })
          break;
        }
        case 3: {
          const {valid} = await this.$refs.educationalStatus.validate();
          if (!valid)
            return;
          this.httpPut(`/member-request/educational`, this.model.educational, () => {
            this.selectedStep++;
          })
          break;
        }
        case 4: {
          const {valid} = await this.$refs.executiveHistory.validate();
          if (!valid)
            return;
          this.httpPut(`/member-request/executive`, this.model.executive, () => {
            this.selectedStep++;
          })
          break;
        }
        case 5: {
          const {valid} = await this.$refs.educationalAndCulturalHistory.validate()
          if (!valid)
            return;
          this.httpPut(`/member-request/educationalAndHistorical`, this.model.educationalAndHistorical, () => {
            this.selectedStep++;
          })
          break;
        }
        case 6: {
          this.httpPut(`/member-request/educational-courses`, this.model.educationalCourses, result => {
            this.$swal.fire({
              icon: 'success',
              text: 'درخواست شما با موفقیت ثبت شد.'
            }).then(() => {
              localStorage.removeItem('accessToken');
              this.selectedStep = 1;
              this.$store.commit('LOGIN_STATE', false);
            })
          })
          break;
        }
      }

    }
  },
  computed: {
    ...mapGetters(['isLogin']),
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