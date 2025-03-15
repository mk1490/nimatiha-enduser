<script lang="ts" setup>
import NavItems from '@/layouts/components/NavItems.vue'
import VerticalNavLayout from '@/@layouts/components/VerticalNavLayout.vue'

import {httpGet, serverAddress} from "@/plugins/http/httpRequest";
import {useStore} from "vuex";

const store = useStore()

onMounted(() => {
  httpGet(`/auth/profile`, result => {
    // store.setRoles(result.roles)
    store.dispatch('setUserInfo', {
      name: result.name,
      family: result.family,
      username: result.username,
    })
  })
})
</script>

<template>
  <VerticalNavLayout>


  </VerticalNavLayout>
</template>

<style lang="scss" scoped>
.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}

.app-logo {
  display: flex;
  align-items: center;
  column-gap: 0.75rem;

  .app-logo-title {
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.75rem;
    text-transform: uppercase;
  }
}
</style>
