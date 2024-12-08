<script>
export default {
  name: "Test",
  data() {
    return {
      result: [],
      model: {},
    }
  },
  created() {
    this.httpGet(`/test/initialize/${this.$route.params.id}`, result => {
      this.result = result;
      result.questions.map(f => {
        this.model[f.id] = null;
      })
    })
  },
  methods: {
    send() {
      this.httpPost(`/test`, {
        testId: this.$route.params.id,
        items: this.model,
      }, result => {
        this.$swal.fire({
          icon: 'success',
          text: 'شرکت در آزمون با موفقیت انجام شد.',
        })
      })
    }
  }
}
</script>

<template>
  <v-container class="d-flex justify-center align-items-center align-center">
    <v-card width="600">
      <v-card-title>

      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(item, index) in result.questions">
            <v-list-item-title>
              {{ (index + 1) + '. ' + item.title }}
            </v-list-item-title>
            <v-radio-group
                class="align-self-right"
                v-model="model[item.id]">
              <v-radio
                  v-for="(childItem, childIndex) in item.items"
                  :value="childItem.value"
                  :label="childItem.label"


              ></v-radio>
            </v-radio-group>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
            @click="send"
            flat
            size="large"
            variant="flat"
            block
            color="indigo-darken-3">
          ارسال
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<style scoped>
::v-deep .v-selection-control-group {
  align-self: center !important;
}

</style>
