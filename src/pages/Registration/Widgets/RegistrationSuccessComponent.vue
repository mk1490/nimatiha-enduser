<template>
  <v-card>
    <v-card-text class="text-center">
      <div class="d-flex justify-center">
        <v-icon
            size="128"
            color="green">
          mdi-check-circle
        </v-icon>
      </div>
      <p>
        درخواست شما با کد پیگیری زیر با موفقیت ثبت شده است.
      </p>
      <div class="d-inline-flex">
        <v-btn
            @click="copyToClipboard"
            class="ml-2"
            icon>
          <v-icon>
            mdi-content-copy
          </v-icon>
        </v-btn>
        <h3 class="trackingCode">
          {{ trackingCode }}
        </h3>
      </div>
      <div class="d-block">
        <v-btn
            @click="$router.push({name: 'Home'})"
            text
            block>
          بازگشت به صفحه اصلی
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RegistrationSuccessComponent",
  props: {
    trackingCode: String,
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.trackingCode);
      this.$toast.success('با موفقیت در حافظۀ کلیپ‌برد ذخیره شد.');
    }
  }
}
</script>

<style scoped>
p {
  font-family: IranVazirmatnUIFD !important;
}

h3 {
  font-family: IranVazirmatnUIFD !important;
}
</style>