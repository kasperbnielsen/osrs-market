<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createUser, login, type GetUserResponse } from "~/api";
import { useQuery } from "@tanstack/vue-query";
import type { StringMappingType } from "typescript";

const isOpen = ref(false);
const store = useUserStore();

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(7),
  })
);

function createNewUser(username: string, password: string) {
  return createUser({ body: { username, password } });
}

function onSubmit(values) {
  console.log("Form submitted!", values);
  store.username = values.username;

  const authorized = login({
    body: { username: values.username, password: values.password },
  });

  console.log(authorized);

  //isOpen.value = false;
}
</script>
<template>
  <div class="bg-slate-700 flex items-center">
    <NuxtLink to="/" class="flex gap-8 p-4">
      <img src="../public/Grand_Exchange_logo.png" width="48" height="48" />
      <p class="self-center text-2xl font-semibold">OSRS Marked</p>
    </NuxtLink>
    <div class="flex justify-center gap-24 self-center w-full absolute">
      <NuxtLink to="/gold"><p class="hover:text-zinc-800">Guld</p></NuxtLink>
      <NuxtLink to="/accounts"
        ><p class="hover:text-zinc-800">Accounts</p></NuxtLink
      >
      <NuxtLink to="/services"
        ><p class="hover:text-zinc-800">Services</p></NuxtLink
      >
      <NuxtLink to="/sell"><p class="hover:text-zinc-800">Sælg</p></NuxtLink>
    </div>
    <div v-if="store.username == ''" class="absolute right-12">
      <Dialog v-model:open="isOpen">
        <DialogTrigger> Login </DialogTrigger>
        <DialogContent>
          <DialogHeader class="flex flex-col gap-8">
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              <Form :validation-schema="formSchema" @submit="onSubmit">
                <div class="flex flex-col gap-8">
                  <FormField v-slot="{ componentField }" name="username">
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input type="text" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" v-bind="componentField" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormField>
                  <Button
                    class="w-fit self-end"
                    type="submit"
                    variant="outline"
                  >
                    Submit</Button
                  >
                </div>
              </Form>
              <Button
                @click="
                  () => {
                    createUser({
                      body: { username: 'huez', password: '1234567' },
                    });
                  }
                "
              >
                Sign up</Button
              >
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
    <div v-else class="absolute right-12">
      <NuxtLink to="/dash">{{ store.username }}</NuxtLink>
    </div>
  </div>
</template>
