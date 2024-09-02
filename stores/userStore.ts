export const useUserStore = defineStore("userStore", () => {
  const username = ref("");

  return { username };
});
