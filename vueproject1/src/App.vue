<script setup lang="ts">
  import NavLinks from './components/Layout/NavLinks.vue'
  import { ref } from 'vue';


  const toggler = ref<boolean>(false);

  const toggle = () => {
    toggler.value = !toggler.value
  }

 
</script>

<template>
  <header v-bind:class="{ 'hidden-header': toggler }" class="bg-blue-900 sticky top-0">


    <div class="container px-20 mx-auto">
      <nav class="flex items-center justify-between">
        <NavLinks  />
      </nav>
    </div>

  </header>

  <main>

    <button class="bg-blue-500 mt-10 ml-10 block text-white px-5 py-3" @click="toggle">Toggle Header</button>

    <div class="container px-20 mx-auto">
      <RouterView />
      
    </div>

  </main>
</template>
