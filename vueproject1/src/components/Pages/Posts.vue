<script lang="ts" setup>
  import { onMounted } from 'vue';
  import { usePosts } from '../../hooks/usePosts';

  const {createPost, posts, isLoading, postAPI, isPaginating, loadMore} = usePosts();


  onMounted(async () => {
    try {
      posts.value = await postAPI.getPosts();
    } finally {
      isLoading.value = false;
    }
  });
  
</script>

<template>
  <div class="my-10">
    <div class="flex justify-between items-baseline">
      <h1 class="text-6xl font-semibold pt-10">{2 + 2}</h1>
      <button
        @click="createPost"
        class="px-5 py-3 rounded bg-blue-500 text-white hover:bg-blue-700"
      >
        Create a post
      </button>
    </div>
    <div v-if="isLoading" class="mt-20 flex items-center justify-center">
      <div
        class="animate-spin h-5 w-5 border-b-2 border-blue-500 rounded-full"
      ></div>
    </div>
    <div
      v-else
      class="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
    >
      <RouterLink
        v-for="post in posts || []"
        :key="post.id"
        :to="`/posts/${post.id}`"
      >
        <div class="bg-white post-card p-10 rounded shadow">
          <h2 class="text-3xl font-semibold">Post - {{ post.title }}</h2>
          <p class="mt-5">
            {{ post.body }}
          </p>
        </div>
      </RouterLink>
    </div>

    <div class="py-10 text-center">
      <button
        :disabled="isPaginating"
        @click="loadMore"
        class="mt-10 px-5 py-3 rounded bg-blue-500 text-white hover:bg-blue-700"
      >
        {{ isPaginating ? "Loading..." : "Load More" }}
      </button>
    </div>
  
  </div>

  
</template>
