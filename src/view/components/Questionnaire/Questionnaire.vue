<script>
export default {
  name: "Questionnaire.vue",
  created() {
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
}
</script>

<template>
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
</template>

<style scoped>

</style>
