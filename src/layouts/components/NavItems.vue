<script lang="ts" setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import {useStore} from 'vuex'

const store = useStore()


</script>

<template>


  <VerticalNavLink
      :item="{
        title: 'دوره‌ها',
        to: '/courses/list',
      }"
  />

  <VerticalNavLink
      :item="{
        title: 'آزمون‌ها',
        to: '/users',
      }"
  />
  <!--  <VerticalNavGroup-->
  <!--      :item="{-->
  <!--      title: 'داده‌های پایه‌ای',-->
  <!--      icon: 'ri-home-smile-line',-->
  <!--    }"-->
  <!--  >-->

  <!--    -->

  <!--    <VerticalNavLink-->
  <!--        :item="{-->
  <!--        title: 'وام‌ها',-->
  <!--        to: '/loans',-->
  <!--      }"-->
  <!--    />-->


  <!--  </VerticalNavGroup>-->

  <!--  <VerticalNavLink-->
  <!--    :item="{-->
  <!--        title: 'تنظیمات',-->
  <!--        to: '/settings',-->
  <!--        icon: 'ri-settings-3-fill',-->
  <!--      }"-->
  <!--  />-->

  <!--  <VerticalNavGroup-->
  <!--    v-if="baseDataStore.checkPermission('school.report.student_attendance')"-->
  <!--    :item="{-->
  <!--      title: 'گزارش‌گیری',-->
  <!--      // badgeContent: '5',-->
  <!--      // badgeClass: 'bg-error',-->
  <!--      icon: 'ri-file-chart-fill',-->
  <!--    }">-->
  <!--    -->
  <!--  </VerticalNavGroup>-->

</template>
