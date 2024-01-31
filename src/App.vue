<template>
  <div class="app">
    <h1>It is a page with posts </h1>
    <!-- <my-button @click="fetchPosts">Get posts</my-button> -->
    <input type="text" v-model.trim="modificatorValue">
    <my-button @click="showDialog" style="margin: 15px 0;">Add post</my-button>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list :posts="posts" @remove="removePost" v-if="!isPostsLoading" />
    <div v-else>Loading...</div>
  </div>
</template>
<script>
import PostList from '@/components/PostList.vue'
import PostForm from '@/components/PostForm.vue'
import axios from 'axios'
import MyButton from './components/UI/MyButton.vue'
export default {
  components: { PostList, PostForm, MyButton },
  data() {
    return {
      posts: [
        // { id: 1, title: 'JavaScript1', body: "Description1" },
        // { id: 2, title: 'JavaScript2', body: "Description2" },
        // { id: 3, title: 'JavaScript3', body: "Description3" },
        // { id: 4, title: 'JavaScript4', body: "Description4" }
      ],
      dialogVisible: false,
      modificatorValue: '',
      isPostsLoading: false
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        // setTimeout(async () => {
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
          this.posts = response.data;
        // }, 1000)
      }
      catch (e) {
        alert('Error')
      }
      finally {
        this.isPostsLoading = false;
      }
    },

  },
  mounted() {
    this.fetchPosts();
  }

}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.btn {
  margin-top: 10px;
  align-self: flex-end;
  padding: 10px 15px;
  background: lightblue;
  color: teal;
  border: 1px solid teal;
}

.post {
  padding: 15px;
  margin-top: 15px;
  border: 2px solid teal;
}

form {
  display: flex;
  flex-direction: column;
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 5px;
  margin-top: 5px;
}
</style>
