<script lang="ts" setup>
import type { GetUserSalesResponse } from "~/api";

defineProps<{ sales: GetUserSalesResponse[] }>();
</script>
<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead> Type </TableHead>
        <TableHead> Buyer </TableHead>
        <TableHead> Date </TableHead>
        <TableHead> Price (DKK) </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="(item, itemIndex) of sales" :key="itemIndex">
        <TableCell
          class=""
          v-for="(cell, cellIndex) of item"
          :key="cellIndex"
          >{{ cell }}</TableCell
        >
      </TableRow>
    </TableBody>
  </Table>
</template>
