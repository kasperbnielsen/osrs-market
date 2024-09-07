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
import type { GenericObject } from "vee-validate";
import { toast } from "./ui/toast/use-toast";

const isOpen = ref(false);
const isSignUp = ref(false);
const { username } = storeToRefs(useUserStore());

const formSchema = toTypedSchema(
  z.object({
    username: z.string().email({ message: "Ugyldig email addresse" }),
    password: z
      .string()
      .min(7, { message: "Adgangskode skal være på mindst 7 karakterer" }),
  })
);

const formSchema2 = toTypedSchema(
  z.object({
    username: z.string(),
    email: z.string().email({ message: "Ugyldig email addresse" }),
    password: z.string().min(7),
  })
);

function createNewUser(username: string, password: string) {
  return createUser({ body: { username, password } });
}

async function onSignUp(values: GenericObject) {
  if (values.password == values.rePassword) {
    await createNewUser(values.username, values.password);
    isSignUp.value = false;
  } else {
    toast({
      variant: "default",
      title: "Mismatch",
      description: "Passwords doesnt match",
    });
  }
}

async function onSubmit(values: GenericObject) {
  console.log("Form submitted!", values);
  try {
    await login({
      body: { username: values.username, password: values.password },
    });
    username.value = values.username;
    isOpen.value = false;
  } catch {
    toast({
      variant: "destructive",
      title: "Unauthorized",
      description: "Wrong email/password, try again",
    });
    isOpen.value = true;
  }
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
    <div v-if="username == ''" class="absolute right-12">
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" v-bind="componentField" />
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
                    Sign in</Button
                  >
                </div>
                <div class="flex gap-4 absolute bottom-8">
                  <p>Don't have an account yet?</p>
                  <button
                    class="font-semi-bold"
                    type="button"
                    @click="
                      () => {
                        isOpen = false;
                        isSignUp = true;
                      }
                    "
                  >
                    Sign up
                  </button>
                </div>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog v-model:open="isSignUp">
        <DialogContent>
          <DialogHeader class="flex flex-col gap-8">
            <DialogTitle>Sign up</DialogTitle>
            <Form
              :validation-schema="formSchema2"
              @submit="onSignUp"
              class="flex flex-col gap-8"
            >
              <FormField v-slot="{ componentField }" name="username"
                ><FormItem>
                  <FormLabel>Brugernavn</FormLabel>
                  <Input type="text" v-bind="componentField" />
                </FormItem>
                <FormMessage
              /></FormField>
              <FormField v-slot="{ componentField }" name="email"
                ><FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" v-bind="componentField" />
                  <FormMessage /> </FormItem
              ></FormField>
              <FormField v-slot="{ componentField }" name="password"
                ><FormItem
                  ><FormLabel>Password</FormLabel>
                  <Input type="password" v-bind="componentField" /> </FormItem
              ></FormField>
              <Button type="submit" variant="outline" class="w-fit self-center"
                >Sign up
              </Button>
            </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
    <div v-else class="absolute right-12">
      <NuxtLink to="/dash">{{ username }}</NuxtLink>
    </div>
  </div>
</template>
