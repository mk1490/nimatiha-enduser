<script>
export default {
  name: "QuestionnaireList",
  created() {
    this.httpGet(`/questionnaire/list`, result => {
      this.items = result;
    })
  },
  data() {
    return {
      items: [],
    }
  },
  methods: {
    examTake(item) {
      if (item.status == true)
        return;
      this.$router.push({
        name: 'questionnaire-details',
        params: {
          slug: item.slug,
        }
      })
    }
  }
}
</script>

<template>
  <v-container>
    <div class="d-inline-flex flex-wrap justify-center">
      <v-card
          class="ma-5"
          v-for="item in items"
          width="300"
      >
        <v-card-title class="text-center">
          {{ item.title }}
        </v-card-title>

        <v-card-text style="height: 20px"></v-card-text>
        <v-card-actions>
          <v-btn
              @click="examTake(item)"
              block
              :class="{'cursor-not-allowed': item.status == true}"
              color="primary"
              flat variant="flat">
            {{ item.status == true ? 'قبلا در این پرسش‌نامه شرکت کرده‌اید' : 'شرکت در پرسش‌نامه' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<style scoped>

</style>
