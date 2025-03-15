<script setup lang="ts">
import {useDisplay} from 'vuetify'
import {VBtn} from 'vuetify/components/VBtn'
import {useRouter, Router} from 'vue-router'
import {useStore} from "vuex";
import BaseButton from "../../views/Base/BaseButton.vue";

const isOverlayNavActive = ref(true)
const isLayoutOverlayVisible = ref(false)
const toggleIsOverlayNavActive = useToggle(isOverlayNavActive)

const router = useRouter()
const store = useStore()

async function logout() {
  localStorage.removeItem('Authorization')
  await router.push('/login')
}

function toggleLayoutOverlayVisibility() {
  store.dispatch('')
}

</script>

<template>
  <v-app-bar scroll-behavior="elevate">
    <div class="d-inline-flex">
      <v-img
          src="https://cdn.tarbiatbonyadi.com/wp-content/uploads/2025/01/desktop-logo-3.webp"
          width="150"
      />

      <div class="d-inline-flex">
        <base-button
            label="دوره ها"
            to="/courses/list"
        />
        <base-button
            label="آزمون ها"
        />
      </div>


    </div>
  </v-app-bar>
  <v-main>
    <router-view/>
  </v-main>

  <footer>
    <div class="container">
      <div class="row">
        <div class="col-12 mt-2">
          <v-tooltip
              location="bottom"
              v-slot:activator="{props}"
              text="پست الکترونیک">
            <v-btn
                color="transparent"
                class="text-white"
                href="mailto:info@nimkatiha.com"
                v-bind="props"
                icon="mdi-mail"
                variant="text">
              Info@nimkatiha.com
            </v-btn>
          </v-tooltip>
        </div>
        <div class="col-12 mt-2">
          <div class="d-inline-flex justify-center">

            <clickable-icon
                target="https://eitaa.com/s/bazarche_dastafarinan"
                src="../../../../public/images/eitaa-logo.png"
                title="ایتا"/>
            <clickable-icon
                target="https://rubika.ir/bazarche_dastafarinan"
                src="../../../../public/images/rubika-logo.png"
                title="روبیکا"/>
            <clickable-icon
                target="https://t.me/bazarche_dastafarinan"
                src="../../../../public/images/telegram-logo.png"
                title="تلگرام"/>
            <clickable-icon
                target="https://instagram.com/bazarche_dastafarinan"
                src="../../../../public/images/insta-logo.png"
                title="اینستاگرام"/>
          </div>
        </div>
        <div class="col-12">
          <p>&copy;کلیه حقوق متعلق به نیمکتی‌ها می‌باشد.</p>
        </div>
      </div>
    </div>
  </footer>
  <!--  <v-footer>-->

  <!--  </v-footer>-->
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
