<script lang="ts" setup>
import { client } from "./api";
import Toaster from "./components/ui/toast/Toaster.vue";

client.setConfig({ baseURL: "http://localhost:5000", throwOnError: true });
</script>
<template>
  <div class="dark">
    <NuxtRouteAnnouncer />
    <NavMenu />
    <NuxtPage />
    <Toaster />
  </div>
</template>
