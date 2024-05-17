export type Post = {
  userId: number;
  id?: number;
  title: string;
  body: string;
};

export async function delay(time: number) {
  return await new Promise((resolve) => setTimeout(resolve, time));
}

export const postAPI = {
  async getPosts(limit: number = 3) {
    try {
      await delay(500);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
      );
      if (response.ok) {
        const data: Array<Post> = await response.json();
        return data;
      }
      return [];
    } catch (e) {
        console.log(e);
        return []
      
    }
  },

  async getPost(id: number) {
    try {
      await delay(500);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      if (response.ok) {
        const data: Post = await response.json();
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  },

  async createPost(post: Post) {
      
    await delay(500);

    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
              method: "POST",
              body: JSON.stringify(post),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }
          )
      
          if (response.ok) {
            const data: Post = await response.json();
            return data;
          }
          return null;
    }
    catch (e) {
        console.log(e);

        return null
        
    }
  },
  async deletePost(id: number) {
    try {
      await delay(1000);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        return true;
      }
      return false;

    } catch (e) {
      console.log(e);
      return false;
    }
  }
};
