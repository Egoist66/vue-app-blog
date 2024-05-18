<script lang="ts">
  import { type Post, postAPI } from '@/api/postAPI';
  import Swal from 'sweetalert2';
  import { ref } from 'vue';



  const posts = ref<Post[]>([]);
  const isLoading = ref<boolean>(true);
  const isPaginating = ref<boolean>(false);
  const isCreating = ref<boolean>(false);
  const limit = ref<number>(3);



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

        if (!inputText.value || !textareaText.value) {
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

        if (response) {
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

  export { posts, isLoading, postAPI, isPaginating, loadMore, createPost };

</script>