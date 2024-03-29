import Main from "@/pages/Main";
import UserPage from "@/pages/UserPage";
import About from "@/pages/About";
import PostIdPage from "@/pages/PostIdPage";
import PostPageWithStore from "@/pages/PostPageWithStore";
import PostPageCompositionApi from "@/pages/PostPageCompositionApi";
import {createRouter, createWebHistory} from 'vue-router';
const routes = [
    {
        path: '/',
        component: Main

    },
    {
        path: '/posts',
        component: UserPage

    },
    {
        path: '/about',
        component: About

    },
    {
        path: '/store',
        component: PostPageWithStore

    },
    {
        path: '/posts/:id',
        component: PostIdPage

    },
    {
        path: '/composition',
        component: PostPageCompositionApi

    },
   
]
const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;