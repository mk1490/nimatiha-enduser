<script lang="ts" setup>
import NavItems from './NavItems.vue'
import VerticalNavLayout from '@layouts/components/VerticalNavLayout.vue'

// Components
import NavbarThemeSwitcher from './NavbarThemeSwitcher.vue'
import UserProfile from './UserProfile.vue'
</script>

<template>
  <VerticalNavLayout>
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->


        <!-- 👉 Search -->
        <!--        <div-->
        <!--          class="d-flex align-center cursor-pointer"-->
        <!--          style="user-select: none;"-->
        <!--        >-->
        <!--          &lt;!&ndash; 👉 Search Trigger button &ndash;&gt;-->
        <!--          <IconBtn>-->
        <!--            <VIcon icon="ri-search-line" />-->
        <!--          </IconBtn>-->

        <!--          <span class="d-none d-md-flex align-center text-disabled">-->
        <!--            <span class="me-3">Search</span>-->
        <!--            <span class="meta-key">&#8984;K</span>-->
        <!--          </span>-->
        <!--        </div>-->

        <VSpacer/>
        <v-btn
            variant="text"
            class="ms-n3 d-lg-none"
            @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="ri-menu-line"/>
        </v-btn>

        <!--        <IconBtn>-->
        <!--          <VIcon icon="ri-notification-line" />-->
        <!--        </IconBtn>-->

        <NavbarThemeSwitcher class="me-2"/>

        <UserProfile/>
      </div>
    </template>

    <template #vertical-nav-header="{ toggleIsOverlayNavActive }">
      <RouterLink
          to="/"
          class="app-logo app-title-wrapper"
      >
      </RouterLink>

      <!--      <IconBtn-->
      <!--        class="d-block d-lg-none"-->
      <!--        @click="toggleIsOverlayNavActive(false)"-->
      <!--      >-->
      <!--        <VIcon icon="ri-close-line" />-->
      <!--      </IconBtn>-->
    </template>

    <template #vertical-nav-content>
      <NavItems/>
    </template>

    <!-- 👉 Pages -->
    <slot/>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer/>
    </template>
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
