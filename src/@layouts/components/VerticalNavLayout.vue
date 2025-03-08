<script setup lang="ts">
import { useDisplay } from 'vuetify'
import VerticalNav from '@layouts/components/VerticalNav.vue'
import { VBtn } from 'vuetify/components/VBtn'
import { useRouter, Router } from 'vue-router'

const isOverlayNavActive = ref(true)
const isLayoutOverlayVisible = ref(false)
const toggleIsOverlayNavActive = useToggle(isOverlayNavActive)

const router = useRouter()

async function logout() {
  localStorage.removeItem('Authorization')
  await router.push('/login')
}


</script>

<template>
  <div
    class="layout-wrapper layout-nav-type-vertical layout-navbar-static layout-footer-static layout-content-width-fluid"
    :class="{ 'layout-overlay-nav': 'mdAndDown'}">
    <vertical-nav :is-overlay-nav-active="isOverlayNavActive"
                  :toggle-is-overlay-nav-active="toggleIsOverlayNavActive">
      <slot name="vertical-nav-header"></slot>
      <slot name="before-vertical-nav-items"></slot>
      <slot name="vertical-nav-content"></slot>
      <slot name="after-vertical-nav-items"></slot>

      <template v-slot:after-nav-items>
        <v-btn
          @click="logout"
          class="mb-2">
          خروج از حساب کاربری
        </v-btn>
      </template>
    </vertical-nav>
    <div class="layout-content-wrapper">
      <header class="layout-navbar navbar-blur">
        <div class="navbar-content-container">
          <slot name="navbar"></slot>
        </div>
      </header>
      <main class="layout-page-content">
        <div class="page-content-container">
          <slot></slot>
        </div>
      </main>
      <footer class="layout-footer">
        <div class="footer-content-container">
          <slot name="footer"></slot>
        </div>
      </footer>
    </div>
    <div class="layout-overlay" :class="{ visible: isLayoutOverlayVisible }" @click="toggleLayoutOverlayVisibility">
    </div>
  </div>
</template>

<style lang="scss">
@use "@configured-variables" as variables;
@use "@layouts/styles/placeholders";
@use "@layouts/styles/mixins";

.layout-wrapper.layout-nav-type-vertical {
  // TODO(v2): Check why we need height in vertical nav & min-height in horizontal nav
  block-size: 100%;

  .layout-content-wrapper {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-block-size: 100dvh;
    transition: padding-inline-start 0.2s ease-in-out;
    will-change: padding-inline-start;

    @media screen and (min-width: 1280px) {
      padding-inline-start: variables.$layout-vertical-nav-width;
    }
  }

  .layout-navbar {
    z-index: variables.$layout-vertical-nav-layout-navbar-z-index;

    .navbar-content-container {
      block-size: variables.$layout-vertical-nav-navbar-height;
    }

    @at-root {
      .layout-wrapper.layout-nav-type-vertical {
        .layout-navbar {
          @if variables.$layout-vertical-nav-navbar-is-contained {
            @include mixins.boxed-content;
          }

            // else
          @else {
            .navbar-content-container {
              @include mixins.boxed-content;
            }
          }
        }
      }
    }
  }

  &.layout-navbar-sticky .layout-navbar {
    @extend %layout-navbar-sticky;
  }

  &.layout-navbar-hidden .layout-navbar {
    @extend %layout-navbar-hidden;
  }

  // 👉 Footer
  .layout-footer {
    @include mixins.boxed-content;
  }

  // 👉 Layout overlay
  .layout-overlay {
    position: fixed;
    z-index: variables.$layout-overlay-z-index;
    background-color: rgb(0 0 0 / 60%);
    cursor: pointer;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease-in-out;
    will-change: transform;

    &.visible {
      opacity: 1;
      pointer-events: auto;
    }
  }

  // Adjust right column pl when vertical nav is collapsed
  &.layout-vertical-nav-collapsed .layout-content-wrapper {
    padding-inline-start: variables.$layout-vertical-nav-collapsed-width;
  }

  // 👉 Content height fixed
  &.layout-content-height-fixed {
    .layout-content-wrapper {
      max-block-size: 100dvh;
    }

    .layout-page-content {
      display: flex;
      overflow: hidden;

      .page-content-container {
        inline-size: 100%;

        > :first-child {
          max-block-size: 100%;
          overflow-y: auto;
        }
      }
    }
  }
}
</style>
