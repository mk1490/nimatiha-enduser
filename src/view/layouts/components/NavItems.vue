<script lang="ts" setup>
import VerticalNavSectionTitle from '@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'


</script>

<template>

  <VerticalNavLink
    :item="{
        title: 'واریزی اعضا',
        to: 'memberDeposits',
      }"
  />
  <VerticalNavLink
    :item="{
        title: 'حسابداری و مالی',
        to: 'accounting',
      }"
  />
  <VerticalNavLink
    :item="{
        title: 'انبارداری',
        to: '/warehousing',
      }"
  />
  <VerticalNavLink
    :item="{
        title: 'برآورد پروژه',
        to: '/project-estimate',
      }"
  />


  <VerticalNavGroup
    :item="{
      title: 'داده‌های پایه‌ای',
      icon: 'ri-home-smile-line',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'اعضا',
        to: '/members',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'کاربران',
        to: '/users',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'پروژه‌ها',
        to: '/projects',
      }"
    />

    <VerticalNavLink
      :item="{
        title: 'تنظیمات',
        to: '/settings',
      }"
    />


  </VerticalNavGroup>

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
