<script setup lang="ts">
    import NavLinks from './components/Layout/NavLinks.vue'
</script>

<template>
  <header class="bg-blue-900 sticky top-0">
    
    <div class="container px-20 mx-auto">
      <nav class="flex items-center justify-between">
        <NavLinks  />
      </nav>
    </div>
    
  </header>

  <main>

    <div class="container px-20 mx-auto">
      <RouterView />
    </div>
  
  </main>
</template>

