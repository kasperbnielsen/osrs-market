<script setup lang="ts">
import { createSale, type SaleEntity } from "~/api";

async function newSale(sale: SaleEntity) {
  return await createSale({
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
    <Button
      @click="
        () => newSale({ userId: 'asd', type: 'Gold', buyer: 'asd', price: 100 })
      "
      >Test sale</Button
    >
  </div>
</template>
