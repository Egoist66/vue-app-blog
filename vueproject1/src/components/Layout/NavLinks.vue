<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";

defineProps<{
  msg?: string;
}>();
</script>

<template>
  <ul class="text-white flex gap-5">
    <li><RouterLink class="hover:underline" to="/">Home</RouterLink></li>
    <li><RouterLink class="hover:underline" to="/about">About</RouterLink></li>
    <li><RouterLink :class="{ 'font-bold': $route.path.includes('posts') }"  class="hover:underline" to="/posts">Posts</RouterLink></li>
  </ul>
</template>
