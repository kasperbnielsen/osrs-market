<script lang="ts" setup>
import type { GetSalesResponse } from "~/api";

defineProps<{ sales: GetSalesResponse[] }>();

const mockData = [
  {
    type: "das",
    buyer: "fdgs",
    date: "dsa",
    price: 123,
  },
  {
    type: "fdg",
    buyer: "ads",
    date: "das",
    price: 123,
  },
  {
    type: "gfd",
    buyer: "ads",
    date: "gfd",
    price: 123,
  },
];
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
