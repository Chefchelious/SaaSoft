<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title
          class="cursor-pointer"
          @click="globalProperties?.$router.push('/')"
        >
          SaaSoft
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <main class="q-pa-sm">
        <router-view />
      </main>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';

defineOptions({
  name: 'main-layout',
});

const globalProperties =
  getCurrentInstance()?.appContext.config.globalProperties;
</script>
