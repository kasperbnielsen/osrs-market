<script lang="ts" setup>
import { useQuery } from "@tanstack/vue-query";
import { createUser } from "~/api";

const tabList = ["Account", "Sales", "Purchases", "Reputation"];

/*const { data: user } = useQuery(
  computed(() => createUser(body: ""))
);*/
</script>
<template>
  <div class="h-screen mx-24 my-12">
    <Tabs>
      <TabsList class="flex gap-8 p-4">
        <TabsTrigger
          v-for="(tab, tabIndex) of tabList"
          :key="tabIndex"
          :value="tab"
        >
          {{ tab }}
        </TabsTrigger>
      </TabsList>

      <template v-for="(tab, tabIndex) of tabList" :key="tabIndex">
        <TabsContent :value="tab"
          ><Card
            ><CardHeader
              ><CardTitle>{{ tab }}</CardTitle> </CardHeader
            ><CardContent v-if="tab == 'Account'"><Account /></CardContent>
            <CardContent v-else-if="tab == 'Sales'">
              <div>
                <DashboardSalesTab />
              </div> </CardContent
            ><CardContent v-else-if="tab == 'Purchases'"
              ><Purchases
            /></CardContent>
            <CardContent v-else><Reputation /></CardContent> </Card
        ></TabsContent>
      </template>
    </Tabs>
    <Button @click="() => {}">test</Button>
  </div>
</template>
