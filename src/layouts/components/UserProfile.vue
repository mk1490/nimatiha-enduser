<script setup lang="ts">
import avatar from '@images/avatars/avatar.png'

import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

const store = useStore()
const router = useRouter()

async function logout() {
  localStorage.removeItem('Authorization')
  await router.push('/login')
}

</script>

<template>
  <VBadge
      dot
      location="bottom right"
      offset-x="3"
      offset-y="3"
      color="success"
      bordered
  >
    <VAvatar
        class="cursor-pointer"
        color="primary"
        variant="tonal"
    >
      <VImg :src="avatar"/>

      <!-- SECTION Menu -->
      <VMenu
          activator="parent"
          width="230"
          location="bottom end"
          offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                    dot
                    location="bottom right"
                    offset-x="3"
                    offset-y="3"
                    color="success"
                >
                  <VAvatar
                      color="primary"
                      variant="tonal">
                    <VImg :src="avatar"/>
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ 'baseDataStore.userInfo.name' }}
            </VListItemTitle>
            <!--            <VListItemSubtitle>Admin</VListItemSubtitle>-->
          </VListItem>
          <!--          <VDivider class="my-2" />-->

          <!--          &lt;!&ndash; 👉 Profile &ndash;&gt;-->
          <!--          <VListItem link>-->
          <!--            <template #prepend>-->
          <!--              <VIcon-->
          <!--                class="me-2"-->
          <!--                icon="ri-user-line"-->
          <!--                size="22"-->
          <!--              />-->
          <!--            </template>-->

          <!--            <VListItemTitle>Profile</VListItemTitle>-->
          <!--          </VListItem>-->
          <!--          -->
          <!--          &lt;!&ndash; 👉 Settings &ndash;&gt;-->
          <!--          <VListItem link>-->
          <!--            <template #prepend>-->
          <!--              <VIcon-->
          <!--                class="me-2"-->
          <!--                icon="ri-settings-4-line"-->
          <!--                size="22"-->
          <!--              />-->
          <!--            </template>-->

          <!--            <VListItemTitle>Settings</VListItemTitle>-->
          <!--          </VListItem>-->


          <!-- Divider -->
          <VDivider class="my-2"/>

          <!-- 👉 Logout -->
          <VListItem @click="logout">
            <template #prepend>
              <VIcon
                  class="me-2"
                  icon="ri-logout-box-r-line"
                  size="22"
              />
            </template>

            <VListItemTitle>خروج از حساب کاربری</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
