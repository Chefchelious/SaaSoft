<template>
  <q-page :class="{ 'q-pa-sm': $q.screen.gt.sm }">
    <account-manage />
  </q-page>
</template>

<script lang="ts" setup>
import accountManage from 'src/components/accounts/account-manage.vue';
</script>

