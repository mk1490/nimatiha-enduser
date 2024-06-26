<template>
  <v-form
      ref="form"
      v-model="isValid"
      lazy-validation>
    <v-container>
      <div class="v-row">
        <div
            class="v-col-12">
          <div
              v-for="item in items"
              class="d-flex">
            <v-checkbox
                :label="item"
            />
          </div>
        </div>
      </div>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "ExecutiveHistory",
  created() {
    this.items.push('بسیج');
    this.items.push('انجمن اسلامی');
    this.items.push('هیأت مذهبی');
    this.items.push('هلال احمر');
    this.items.push('سازمان دانش‌آموزی');
    this.items.push('خبرگزاری پانا');
    this.items.push('سایر');
  },
  data() {
    return {
      isValid: false,
      items: [],
    }
  }
}
</script>
<style scoped>

</style>