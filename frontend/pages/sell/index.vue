<script setup lang="ts">
import { createSale, type SaleEntity } from "~/api";

function newSale(sale: SaleEntity) {
  return createSale({
    body: {
      userId: sale.userId,
      type: sale.type,
      buyer: sale.buyer,
      price: sale.price,
    },
  });
}
</script>
<template>
  <div>
    <Button @click="() => newSale({userId: "", type: 'Gold', buyer: '', price: 100})">Test sale</Button>
  </div>
</template>
