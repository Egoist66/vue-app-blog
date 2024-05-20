<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { postAPI, type Post } from '@/api/postAPI';
import router from '../../../router/router';

const route = useRoute();

const post = ref<Post | undefined>(undefined);
const isLoading = ref<boolean>(true);
const isDeleting = ref<boolean>(false);

let isMounted = false;

onMounted(async () => {
    if (isMounted) return;
    isMounted = true;
    try {
        const id = Number(route.params.id);
        if (isNaN(id)) return;
        post.value = await postAPI.getPost(id);
    } finally {
        isLoading.value = false;
    }
})

const deletePost = async () => {
    isDeleting.value = true;
    if (await postAPI.deletePost(+route.params.id)) {
        isDeleting.value = false;
        router.push({ path: '/posts', replace: true });
    }
}

const x = ref(0)
const y = ref(0)

watch(
    () => +x.value + (+y.value),
    (sum) => {
        console.log(`сумма x + y равна: ${sum}`)
    }
)


</script>

<template>
    <div class="py-10">
        <h1 class="text-6xl font-semibold">Post - {{ route.params.id }}</h1>
        <div v-if="isLoading" class="mt-10 flex items-center justify-center">
            <div class="animate-spin h-5 w-5 border-b-2 border-blue-500 rounded-full"></div>
        </div>
        <div class="mt-20">
            <p class="text-xl  pb-10">{{ post?.body }}</p>
            <input v-model="x" class="border-b-2" type="text">
            <input v-model="y" class="border-b-2" type="text">
            <p class="text-xl py-5"><b>By User {{ post?.userId }}</b></p>
        </div>

        <div class="mt-20 text-center">
            <button :disabled="isDeleting" @click="deletePost"
                class="px-5 py-3 rounded bg-red-500 text-white hover:bg-red-700">
                {{ isDeleting ? 'Deleting...' : 'Delete Post' }}
            </button>
        </div>
    </div>
</template>
