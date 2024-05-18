<template>
    <div class="text-center my-10">
        <h1 class="text-6xl font-semibold">About</h1>
        <p class="mt-10 text-2xl">
            This is a beautiful Vue About page generated with Tailwind CSS
        </p>
        <div class="mt-20 flex justify-center gap-5">
            <p class="text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum justo sed,
                convallis nunc. In hac habitasse platea dicta est. Sed ut ipsum dolor. Nullam dictum felis,
                nisi euismod auctor. In hac habitasse platea dicta est. Sed ut ipsum dolor. Nullam dictum felis,
                nisi euismod auctor.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, } from 'vue-router';


    onBeforeRouteUpdate((updateGuard) => {
      // Изменение заголовка страницы
      document.title = updateGuard.meta.title as string;
    });

</script>