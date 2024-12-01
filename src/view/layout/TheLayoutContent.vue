<template>
  <transition
      name="fade-transform"
      mode="out-in">
    <keep-alive>
      <v-main>
        <v-container>
          <router-view/>
        </v-container>
      </v-main>
    </keep-alive>
  </transition>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'TheLayoutContent',
  data: () => ({}),
  methods: {}
};
</script>
<style>
.v-main {
  @media (min-width: 376px) {
    padding: 6rem 2rem 0 2rem !important;
  }
  @media (min-width: 480px) {
    padding: 4rem 3rem 0 3rem !important;
  }

}
</style>
