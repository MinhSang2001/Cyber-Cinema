<template>
  <div class="container mt-5">
    <div class="container d-flex">
        <div class="">
        <img 
            :src="'https://image.tmdb.org/t/p/w300/' + this.actor.profile_path"
            alt=""
            style="width: 32vh">
        <ul class="d-flex" style="list-style: none; margin-left: -36px">
            <li class="" style="font-size: 24px">
                <i class="fa-brands fa-square-facebook"></i>
            </li>
            <li class="ml-3" style="font-size: 24px">
                <i class="fa-brands fa-instagram"></i>
            </li>
            <li class="ml-3" style="font-size: 24px">
                <i class="fa-brands fa-twitter"></i>
            </li>
            <li class="ml-3" style="font-size: 24px">
                <i class="fa-solid fa-earth-americas"></i>
            </li>
        </ul>
    </div>
    <div class="ml-5">
        <h4 class="font-weight-bold">
            {{ this.actor.name }}
        </h4>
        <div>
            <i class="fa-solid fa-cake-candles"></i>
            <span class="ml-2" style="color: #ccc">{{ this.actor.birthday }}</span>
        </div>
        <div style="color: #e6e6e6;" class="mt-3 text-limited">{{ this.actor.biography }}</div>
    </div>
    </div>
    <div class="container">
        <h3 class="font-weight-bold">Known For</h3>
        <div class="row d-flex flex-wrap mt-3">
            <div class="col-6 col-xs-4 col-md-3 col-sm-6 mb-4"
                    :key="movie.id"
                    v-for="movie in this.knownFor">
                    <router-link
                    :to="`/movie/${movie.id}`">
                    <img 
                    :src="movieImage(movie)" 
                    alt=""
                    class=""
                    style="width: 210px; ">
                    <p class="text-decoration-none movie-hidden mt-3" style="color: #ccc; max-width: 150px">
                        {{ movie.title }}
                    </p>
                    </router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            socialDetails: [],
            actor: {},
            knownFor: [],
        }
    },
    mounted() {
        this.fetchActor(this.$route.params.id)
        this.fetchCredits(this.$route.params.id)
    },
    methods: {
        async fetchActor(actorId) {
            try {
                const response = await axios.get(
                "https://api.themoviedb.org/3/person/" + actorId + "?api_key=f03adac0126c749980d255aeb2cfd676&language=en-US"
            )
                this.actor = response.data
            } catch (error) {
                console.log(error)
            }
        },
        async fetchCredits(actorId) {
            try {
                const response = await axios.get(
                "https://api.themoviedb.org/3/person/" + actorId + "/movie_credits" +"?api_key=f03adac0126c749980d255aeb2cfd676&language=en-US"
            )
                this.knownFor = response.data.cast.slice(
                    Math.max(response.data.cast.length - 6, 1)
                )
            } catch (error) {
                console.log(error)
            }
        },
        movieImage(movie) {
            const posterPath = movie.poster_path
            if(!posterPath) {
                return "https://via.placeholder.com/185x278"
            } else {
                return "https://image.tmdb.org/t/p/w185/" + posterPath
            }
        }
    }
}
</script>

<style>
    .col img:hover{
        opacity: 0.75;
        transition: ease-in-out 0.5s;
    }
    .text-limited {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 10; /* number of lines to show */
                line-clamp: 10; 
        -webkit-box-orient: vertical;
    }
    .movie-hidden {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1; /* number of lines to show */
                line-clamp: 1; 
        -webkit-box-orient: vertical;
    }
</style>