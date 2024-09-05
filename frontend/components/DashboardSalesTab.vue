<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { getUserSalesOptions } from "~/api/@tanstack/vue-query.gen";

const { userId } = storeToRefs(useUserStore());

console.log(userId.value);

const { data: sales } = useQuery(
  computed(() =>
    getUserSalesOptions({ path: { user_id: "66d8688aeb43a1506c21d98c" } })
  )
);
</script>
<template>
  <Sales :sales="sales || []" />
</template>
