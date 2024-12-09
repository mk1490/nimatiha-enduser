<script>
export default {
  name: "TestList",
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.httpGet(`/test/list`, result => {
      this.items = result;
    })
  },
  methods: {
    examTake(item) {
      if (item.status === 1)
        return;
      this.$router.push({
        name: 'test-details',
        params: {
          id: item.id
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
              :class="{'cursor-not-allowed': item.status !== 1}"
              color="primary"
              flat variant="flat">
            {{ item.status === 1 ? 'قبلا در این آزمون شرکت کرده‌اید' : 'شرکت در آزمون' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>

<style scoped>

</style>
