<template>
  <div class="container mt-4 px-4 py-16">
    <h2 class="text-warning text-lg">
        Popular Actors
    </h2>
    <div class="row">       
        <actor-item 
            :key="actor.id" 
            v-for="actor in this.actors" 
            :actor="actor">
            </actor-item>
    </div>
    <div class="text-center mt-2 mb-2">
        <a href="" v-on:click.prevent="previous()">
        Previous
    </a>
    <a href="" v-on:click.prevent="next()" class="ml-4">
        Next
    </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ActorItem from '../items/ActorItem.vue'
let  currentPage = 1
export default {
    data() {
        return {
            actors: [],
        }
    },
    components: {
        ActorItem,
    },
    mounted() {
        this.fetchActors(currentPage)
        // this.scroll()
    },
    methods: {
        async fetchActors(page) {
            try {
                const response = await axios.get(
                    "https://api.themoviedb.org/3/person/popular?api_key=f03adac0126c749980d255aeb2cfd676&language=en-US&page=" + page
                )
                this.actors = response.data.results;
            } catch (error) {
                console.log(error)
            }
        },
        scroll() {
            window.onscroll = () => {
                let bottomOfWindow = 
                    document.documentElement.scrollTop + window.innerHeight ===
                    document.documentElement.offsetHeight
                if(bottomOfWindow) {
                    currentPage += 1;
                    this.fetchActors((currentPage += 1))
                }
            }
        },
        next() {
            currentPage += 1
            this.fetchActors(currentPage)
        },
        previous() {
            currentPage -= 1
            this.fetchActors(currentPage)
        }
    }
}
</script>

<style>

</style>