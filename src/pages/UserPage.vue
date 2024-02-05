<template>
    <h1>It is a page with posts </h1>
    <input v-model="searchQuery" type="text" placeholder="Search..." v-focus />
    <div class="app__btns">
        <my-button @click="showDialog">Add post</my-button>
        <my-select id="sortSelect" v-model="selectedSort" :options="sortOptions" />
    </div>
    <!-- <my-button @click="fetchPosts">Get posts</my-button> -->
    <!-- <input type="text" v-model.trim="modificatorValue"> -->
    <my-dialog v-model:show="dialogVisible">
        <post-form @create="createPost" />
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading" />
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div class = "page__wrapper">
        <div v-for="pageNumber in totalPages" 
        class="page" 
        :class="{'current-page': page===pageNumber}" 
        :key="pageNumber"
        @click="changePage(pageNumber)">
        {{ pageNumber }}
        </div>
      </div> -->
</template>
<script>
import PostList from '@/components/PostList.vue'
import PostForm from '@/components/PostForm.vue'
import axios from 'axios'
export default {
    components: { PostList, PostForm, },
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
            isPostsLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                { value: 'title', name: 'By name' },
                { value: 'body', name: 'By description' },
            ]
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
        // changePage(pageNumber){
        //  this.page = pageNumber
        // },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                // setTimeout(async () => {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
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
        async loadMorePosts() {
            try {
                this.page += 1;
                // setTimeout(async () => {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                })
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = [...this.posts, ...response.data];
                // }, 1000)
            }
            catch (e) {
                alert('Error')
            }
        },

    },
    mounted() {
        this.fetchPosts();
        console.log(this.$refs.observer);
    //     const options = {
    //         rootMargin: "0px",
    //         threshold: 1.0,
    //     };
    //     const callback = (entries, observer) => {
    //         if (entries[0].isIntersecting && this.page < this.totalPages) {
    //             this.loadMorePosts()
    //         }
    //     };
    //     const observer = new IntersectionObserver(callback, options);
    //     observer.observe(this.$refs.observer);
     },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) =>
                post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    // watch:{
    //   page(){
    //     this.fetchPosts()
    //   }
    // }

}

</script>
  
<style>
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

.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10 px;

}

.current-page {
    border: 2px solid teal;
    background: lightblue;
}

.observer {
    height: 5px;
    background: green;
}
</style>
  