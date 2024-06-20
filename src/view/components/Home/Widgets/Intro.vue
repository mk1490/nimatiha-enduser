<template>
  <div class="mx-10 v-row text-center">
    <div
        class="v-col-md-6 align-self-center">
      <div class="d-flex justify-center">
        <img
            src="@/assets/logo.jpg" width="250" alt="">
      </div>
    </div>
    <div
        class="v-col-md-6 mx-auto d-flex flex-column align-self-center">
      <h2 class="section-heading">{{ title }}</h2>
      <div v-html="description" class="text-justify mt-5">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Intro",
  props: {
    title: String,
    description: String,
  }
}
</script>

<style scoped>
h2 {
  font-size: x-large;
}

::v-deep p {
  text-align: justify;
}
</style>