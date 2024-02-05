<template>
    <!-- <div>
        <h1>{{ $store.state.post.limit }}</h1>
        {{ $store.commit('user/setLoading') }}
    </div> -->
    <h1>It is a page with posts </h1>
    <my-input :model-value="searchQuery" @update:model-value="setSearchQuery" type="text" placeholder="Search..." v-focus />
    <div class="app__btns">
        <my-button @click="showDialog">Add post</my-button>
        <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
        <post-form @create="createPost" />
    </my-dialog>
    <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isPostsLoading" />
    <div v-else>Loading...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
</template>
<script>
import PostList from '@/components/PostList.vue'
import PostForm from '@/components/PostForm.vue'
import MyButton from '@/components/UI/MyButton.vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    components: { PostList, PostForm, MyButton, },
    data() {
        return {
            posts: [],
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'

        }),

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
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        ...mapGetters({
            sortedPosts: '/post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',

        }),
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
    },

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
  