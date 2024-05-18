<script setup lang="ts">
import { defineProps, type VNode } from "vue";

defineProps<{
  msg?: VNode | string;
}>();
</script>

<template>
  <ul class="text-white flex gap-5">
    <!-- If msg is a string, render it as a text node -->

    <li  v-html="msg"></li>
    <li><RouterLink class="hover:underline" to="/">Home</RouterLink></li>
    <li><RouterLink class="hover:underline" to="/about">About</RouterLink></li>
    <li><RouterLink :class="{ 'font-bold': $route.path.includes('posts') }"  class="hover:underline" to="/posts">Posts</RouterLink></li>
  </ul>
</template>


