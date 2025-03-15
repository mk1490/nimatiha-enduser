<script>
export default {
  name: "ClickableIcon",
  props: {
    title: String,
    src: String,
    target: String,
  },
  computed: {
    finalSrc() {
      return this.src
    }
  }
}
</script>

<template>
  <v-tooltip
      location="bottom"
      v-slot:activator="{props}"
      :text="title">
    <div
        v-bind="props"
        class="image-container">
      <a :href="target">


        <img
            width="32"
            height="32"
            :src="finalSrc"

        />
      </a>
    </div>
  </v-tooltip>

</template>

<style scoped>
.image-container img {
  transition: transform 0.200s ease-in-out;
}

.image-container img:hover {
  transform: scale(1.5);
}
</style>