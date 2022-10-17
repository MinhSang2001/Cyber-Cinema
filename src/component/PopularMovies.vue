<template>
  <div class="container">
    <h2 class="mt-3 text-warning text-lg">
        Popular Movies
    </h2>
    <div class="container">
      <div class="row">
      <movie-list-popular 
        v-for="movie in movies" 
        :key="movie.id" 
        :movie="movie" 
        :genres="genres"/>
      </div>
    </div>
    <div class="text-center mt-5 mb-5">
        <a href="" v-on:click.prevent="previous()">
          <button class="btn btn-primary" style="width: 100px"> Previous </button>
    </a>
    <a href="" v-on:click.prevent="next()" class="ml-4">
        <button class="btn btn-primary" style="width: 100px">Next</button>
    </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios' 
import MovieListPopular from './items/MovieListPopular.vue'
let currentPage = 1
export default {
  data() {
    return {
      movies: [],
      genres: [],
    };
  },
  components: {
    MovieListPopular
  },
  async mounted() {
    this.fetchGenres();
    this.fetchMovies(currentPage)
  },
  methods: {
     async fetchMovies(page) {
            try {
                const response = await axios.get(
                    "https://api.themoviedb.org/3/movie/popular?api_key=f03adac0126c749980d255aeb2cfd676&language=en-US&page=" + page
                )
                this.movies = response.data.results;
            } catch (error) {
                console.log(error)
            }
        },
    async fetchGenres(){
      // https://api.themoviedb.org/3/genre/movie/list
        try {
        const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=f03adac0126c749980d255aeb2cfd676&language=en-US');
        this.genres = response.data.genres;
        } catch (error) {
        console.log(error)
        }
    },
    next() {
            currentPage += 1
            this.fetchMovies(currentPage)
        },
        previous() {
            currentPage -= 1
            this.fetchMovies(currentPage)
        }
  }
}
</script>

<style>

</style>