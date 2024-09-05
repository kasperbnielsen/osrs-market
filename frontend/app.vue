<script lang="ts" setup>
import { client } from "./api";

client.setConfig({ baseURL: "http://localhost:5000", throwOnError: true });
</script>
<template>
  <div class="dark">
    <NuxtRouteAnnouncer />
    <NavMenu />
    <NuxtPage />
  </div>
</template>
