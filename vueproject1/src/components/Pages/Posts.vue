<script lang="ts" setup>
import type { Post } from "@/api/postAPI";
import { onMounted, ref } from "vue";
import { delay, postAPI } from "../../api/postAPI";
import Swal from "sweetalert2";

const posts = ref<Post[]>([]);
const isLoading = ref<boolean>(true);
const isPaginating = ref<boolean>(false);
const isCreating = ref<boolean>(false);
const limit = ref<number>(3);

onMounted(async () => {
  try {
    posts.value = await postAPI.getPosts();
  } finally {
    isLoading.value = false;
  }
});

const loadMore = async () => {
  limit.value += 3;
  try {
    isPaginating.value = true;
    const newPosts = await postAPI.getPosts(limit.value);
    posts.value = [...newPosts];
  } finally {
    isPaginating.value = false;
  }
};

const createPost = async () => {
  const html = `
        <div class="flex flex-col space-y-4">
            <input type="text" id="myInput" placeholder="Enter title" class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md" />
            <textarea id="myTextarea" placeholder="Enter body text" class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md" rows="5"></textarea>
        </div>
    `;
  Swal.fire({
    title: "Lets create a post!",
    html,
    confirmButtonText: `${isCreating.value ? 'Creating...' : 'Create'}`,
    confirmButtonColor: '#1D4ED8',
    allowEscapeKey() {
      return true;
    },
    
  }).then(async (result) => {
    if (result.isConfirmed) {
        const inputText = document.getElementById('myInput') as HTMLInputElement;
        const textareaText = document.getElementById('myTextarea') as HTMLTextAreaElement;

        if(!inputText.value || !textareaText.value) {
            Swal.fire({
                icon: 'error',
                title: 'Values are required!',
                confirmButtonColor: '#1D4ED8',
            })
            return
        }
        
        isCreating.value = true;
        Swal.fire({
            icon: 'info',
            title: 'Please wait...',
            confirmButtonColor: '#1D4ED8',
        })
        const response = await postAPI.createPost({
            title: inputText.value,
            body: textareaText.value,
            userId: Date.now()
        })

        if(response) {
            Swal.close();
            isCreating.value = false;
            posts.value = [response, ...posts.value];
            Swal.fire({
                icon: 'success',
                title: 'Post created successfully!',
                confirmButtonColor: '#1D4ED8',
            })
        
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!',
                confirmButtonColor: 'crimson',
            })
        }
    }
  });
};
</script>

<template>
  <div class="my-10">
    <div class="flex justify-between items-baseline">
      <h1 class="text-6xl font-semibold pt-10">Blog</h1>
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

    <div class="mt-20 text-center">
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
