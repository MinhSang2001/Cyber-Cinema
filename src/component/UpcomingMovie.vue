<template>
    <div class="container">
        <div id="example text-light">
        <h2 class="text-warning font-weight-bold mt-2">
            Upcoming Movies
        </h2>
        <carousel-3d 
            :controls-visible="true" 
            :clickable="false"
            :key="upcomingMovies.length"
            :listData="upcomingMovies"
            :height="500"
            :autoplay="true" :autoplay-timeout="3000" >
            <slide :index="i" v-for="(movie, i) in this.upcomingMovies" :key="i">
            <figure>
                    <img 
                        :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path"
                        @click="redirectedSearch(movie.id)">
                    <figcaption>
                        {{movie.original_title}}
                    </figcaption>
            </figure>
            </slide>
        </carousel-3d>
    </div>
    </div>
</template>

<script>
import { Carousel3d, Slide} from 'vue-carousel-3d'
import axios from 'axios'
export default {
    data() {
        return {
            upcomingMovies: []
        }
    },
    components: {
        Carousel3d,
        Slide
    },
    mounted() {
        this.fetchUpcomingMovies()
    },
    methods: {
        async fetchUpcomingMovies() {
            const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=f03adac0126c749980d255aeb2cfd676&language=en-US&page=1')
            this.upcomingMovies = response.data.results.slice(1, 12)
        },
        redirectedSearch(id) {
            this.$router.push(
                {
                  name: 'movie',
                  params: {
                    id: id
                  }
                }
              )
        }
    },
}
</script>

<style>
    .carousel-3d-container figure {
    margin:0;
    }

    .carousel-3d-container figcaption {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    bottom: 0;
    position: absolute;
    bottom: 0;
    padding: 15px;
    font-size: 20px;
    min-width: 100%;
    box-sizing: border-box;
    }
    .next span,
    .prev span {
        color: white;
    }
</style>