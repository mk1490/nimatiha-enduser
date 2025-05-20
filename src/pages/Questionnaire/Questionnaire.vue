<script>
import RegistrationSuccessComponent from "../Registration/Widgets/RegistrationSuccessComponent.vue";
import {mapGetters} from "vuex";
import DynamicStep from "../Registration/Steps/DynamicStep.vue";
import ProfileCompleteForm from "@/pages/Shared/ProfileCompleteForm.vue";
import {httpGet, httpPost, serverAddress} from "@/plugins/http/httpRequest";
import MultipleFullScreenImageSlider from "@/views/user-interface/MultipleFullScreenImageSlider.vue";
import {useToast} from "vue-toast-notification";
import {db} from '@/db'

const toast = useToast()
export default {
  name: "Questionnaire",
  components: {MultipleFullScreenImageSlider, ProfileCompleteForm, DynamicStep, RegistrationSuccessComponent},
  async mounted() {
    if (this.stepId) {
      await this.setInitializeData();
    }
    httpGet(`/core/initialize?slug=${this.$route.params.slug}`, result => {
      try {
        if (result.success === true) {
          if (result.authRequired && !this.isLogin) {
            this.$router.push({
              name: 'login',
              query: {
                redirectTo: this.$route.fullPath,
              }
            })
            return;
          }
          this.sliders = result['imageSliders'].map(f => f.imageUrl)
          this.audioUrl = result['backgroundMusic']
          this.title = result['questionnaireTitle'];
          this.preTextMessage = result['preText']
          this.afterTextMessage = result['afterText']
          this.$store.commit('SET_TOOLBAR_AND_FOOTER_VISIBLE', this.isLogin)
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
      } catch (e) {
        console.log(e)
      }
    })
  },
  methods: {
    serverAddress() {
      return serverAddress
    },
    finish() {
      this.slider.visible = false;
    },
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
        toast.error('لطفا خطاهایی که در فرم وجود دارد را برطرف نمایید.')
        return
      }
      const id = this.stepId;
      let payload = {}
      Object.keys(this.model).map(f => {
        Object.keys(this.model[f]).map(fieldItem => {
          if (this.model[f][fieldItem]) {
            payload[fieldItem] = Array.isArray(this.model[f][fieldItem]) ? this.model[f][fieldItem].map(f => f + '') : this.model[f][fieldItem];
          }
        })
      })

      console.log("PAYLOAD", payload)
      const result = await db.tempData.get(id);
      await db.tempData.delete(id)
      db.tempData.add({id, jsonData: payload})
      this.selectedStep++;
      return
      httpPost(`/form-answer/${this.steps[this.selectedStep - 1].id}`, payload, result => {
        if (this.selectedStep === this.steps.length) {
          this.$swal.fire({
            icon: 'success',
            html: this.afterTextMessage,
            allowEscapeKey: false,
            allowOutsideClick: false,
          }).then((res) => {
            if (res.isConfirmed) {
              localStorage.removeItem('Authorization');
              this.selectedStep = 1;
              this.$store.commit('LOGIN_STATE', false);
              location.reload();
            }
          });
        } else {
          this.selectedStep++;
        }
      })
    },
    async setInitializeData() {
      const result = await db.tempData.get(this.stepId);
      console.log("RESULT ", result)
      if (result) {
        this.model[this.stepId] = result.jsonData;
      }
    }
  },
  data() {
    return {
      audioUrl: null,
      slider: {
        visible: true,
      },
      selectedStep: 4,
      sliders: [],
      steps: [],
      model: {},
      title: '',
      preTextMessage: '',
      afterTextMessage: '',
    }
  },
  computed: {
    ...mapGetters(['phoneNumber', 'isLogin']),
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
    },
    stepId: function () {
      const selectedStepItem = this.steps[this.selectedStep - 1];
      return selectedStepItem ? selectedStepItem.id : null
    }
  },
  watch: {
    stepId: {
      async handler(value) {
        await this.setInitializeData();
      }
    }
  }
}
</script>

<template>
  <v-container
      class="d-flex justify-center">
    <v-card
        :width="cardWidth"
        class="elevation-0">
      <v-card-text>
        <template v-if="preTextMessage">
          <div v-html="preTextMessage"></div>
        </template>

        <template v-if="preTextMessage == null">
          <v-stepper
              hide-actions
              :model-value="selectedStep"
              position="relative"
              flat
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
        </template>

      </v-card-text>
      <v-card-actions v-if="preTextMessage">
        <v-btn
            @click="preTextMessage = null"
            block
            variant="flat"
            color="red"
        >
          تکمیل پرسش‌نامه
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
  <multiple-full-screen-image-slider
      v-if="slider.visible && sliders.length > 0"
      :slides="sliders"
      @finish="finish"
  />

  <audio
      :src="serverAddress() + audioUrl"
      hidden="hidden"
      autoplay="true" controls/>
</template>

<style scoped>
@media (max-width: 720px) {
  ::v-deep .v-stepper-header {
    display: none !important;
  }
}


</style>
