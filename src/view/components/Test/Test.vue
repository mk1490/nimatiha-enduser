<script>
import BaseTextArea from "@/view/widget/Base/BaseTextArea.vue";

export default {
  name: "Test",
  components: {BaseTextArea},
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
    }, error => {
      this.$router.push({
        name: 'test'
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
          text: this.result.endDescription,
        })
        this.$router.push({
          name: 'test'
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
        <v-card
            class="mb-4"
            v-for="(item, index) in result.questions">
          <v-card-text>
            <div class="block">
              <p>
                {{ (index + 1) + '. ' + item.title }}
              </p>
            </div>

            <div class="d-block">

              <v-radio-group
                  v-if="item.type === 1"
                  class="align-self-right full-width"
                  v-model="model[item.id]">
                <div class="row">
                  <div
                      v-for="(childItem, childIndex) in item.items"
                      class="col-6">
                    <v-radio
                        :value="childItem.value"
                        :label="childItem.label">
                    </v-radio>
                  </div>
                </div>
              </v-radio-group>
              <div v-if="item.type ===2 ">
                <base-text-area
                    v-model="model[item.id]"
                    placeholder="محل نوشتن پاسخ..."
                />
              </div>

            </div>
          </v-card-text>

        </v-card>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
            @click="send"
            flat
            size="large"
            variant="flat"
            block
            color="green-darken-1">
          ارسال
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<style scoped>
::v-deep .v-selection-control-group {
  align-self: center !important;
  width: 100%;
}

</style>
