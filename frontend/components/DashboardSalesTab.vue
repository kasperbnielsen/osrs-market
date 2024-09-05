<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { getSales, type GetSalesResponse } from "~/api";
import { getSalesOptions } from "~/api/@tanstack/vue-query.gen";

const { userId } = storeToRefs(useUserStore());

const { data: sales }: GetSalesResponse = useQuery(
  computed(() => getSalesOptions({ path: { userId: userId.value } }))
);
</script>
<template>
  <Sales :sales="sales || []" />
</template>
