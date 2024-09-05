export const useUserStore = defineStore("userStore", () => {
  const username = ref("");
  const userId = ref("");

  return { username, userId };
});
