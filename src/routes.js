import VueRouter from "vue-router"
import Home from './component/Home.vue'
import Movie from './component/Movie.vue'
import Actor from './component/actors/Actors.vue'
import ActorDetail from './component/actors/ActorDetails.vue'
let router = new VueRouter({
    mode: 'history',
    routes: [
        { 
            path: "/",
            name: 'homepage',
            component: Home
        },
        { 
            path: "/movie/:id",
            name: 'movie',
            component: Movie
        },
        {
            path: "/actors",
            name: "actors",
            component: Actor
        },
        {
            path: "/actors/:id",
            name: "actorDetail",
            component: ActorDetail
        }
    ]
})
export default router