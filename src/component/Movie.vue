<template>
  <div class="container">
    <div class="container mx-auto d-flex mt-5 border-bottom pb-5">
      <div class="movie-action  col-xs-3 col-md-3 col-lg-3 col-6">
      <img 
        :src="posterPath" 
        alt="" 
        class=""
        style="width: 100%">
      <a 
            href="https://www.youtube.com/embed/UsZo07I_zuY" 
            class="movie-action-play rounded-circle bg-warning text-dark px-3 py-2"
            style="font-size: 15px;">
            <i class="fa-solid fa-play"></i>
            </a>  
      </div>
      <div class="col-xs-9 col-md-9 col-lg-9 col-6 " style="font-size: 13px">
        <h3 class="">{{ this.movie.title }}</h3>
        <i class="fa-solid fa-star text-warning"></i>
        <span class="text-secondary">{{ this.movie.vote_average * 10}}% | {{ this.movie.release_date }} 
          <span :key="index" v-for="(item, index) in movie.genres">
            {{ item.name }}
            <span v-if="(movie.genres.length - 1 != index)">
            ,
            </span>    
          </span>
        </span>
        <p class="descreption-hidden">{{ this.movie.overview }}</p>
        <div class="mt-3">
          <span class="mt-3 font-weight-bold">Featured Cast</span>
          <div class="d-flex">
            <div class="" :key="index" v-for="(crew, index) in movie.credits.crew">
            <div class="mt-2 mr-4" v-if="index < 2" :style="{maxWidth: 200 + 'px'}">
              <span>{{ crew.name }}</span>
              <br>
              <span class="text-secondary">{{ crew.job }}</span>
            </div>
          </div>
          </div>
        </div>
        <div class="row mt-3 d-inline-flex " style="font-size: 12px;">
          <a 
            @click.prevent="openYoutubeModel"
            :href="youtubeVideo" 
            class="rounded bg-warning text-dark px-3 py-2 mt-1 ml-3"
            style= "width: 120px"
            data-toggle="modal" 
            data-target="#exampleModalCenter">
            <i class="fa-solid fa-play"></i>
            Play Trailer</a>
          <a 
            href="#" 
            class="rounded bg-warning text-dark px-3 py-2 ml-3 mt-1"
            style= "width: 120px">
            <i class="fa-regular fa-heart"></i>
            Favourite</a>
        </div>
      </div>
    </div>
    <cast :casts="movie.credits.cast"/>
    <image-movie :images="movie.images.backdrops" v-on:on-image-click="showImageModel"></image-movie>
    <media-model v-model="modelOpen" :mediaURL="mediaURL" :isVideo="this.isVideo"></media-model>
  </div>
</template>

<script>
import axios from 'axios'
import Cast from './Cast.vue'
import ImageMovie from './Image.vue'
import MediaModel from './models/MediaModel.vue'
export default {
  data() {
    return {
      movie: {
        credits: {
          crew: {}
        },
        images: {
          backdrops: {}
        }
      },
      modelOpen: false,
      isVideo: false,
      mediaURL: ""
    }
  },
  components: {
    Cast,
    ImageMovie,
    MediaModel,
  },
  mounted() {
    this.fetchMovie(this.$route.params.id)
  },
  watch: {
    "$route.params.id": {
      handler() {
        this.fetchMovie(this.$route.params.id)
      }
    }
  },
  methods: {
    async fetchMovie(movieId) {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/" + movieId + "?api_key=f03adac0126c749980d255aeb2cfd676&append_to_response=credits,videos,images"
        )
      this.movie= response.data
    },
    openYoutubeModel() {
      this.mediaURL = this.youtubeVideo()
      this.modelOpen = true
      this.isVideo = true
    },
    openImageModel() {
      this.isVideo = false
      this.modelOpen = true
    },
    showImageModel(imageFullPath) {
      this.mediaURL = imageFullPath
      this.modelOpen = true
      this.isVideo = false
    },
    youtubeVideo() {
      return "https://www.youtube.com/embed/" + this.movie.videos.results[0].key
    },
  },
  computed: {
    posterPath() {
      return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path
    },
  },
  
}
</script>

<style>
  .movie-action{
    position: relative;
  }
  .movie-action-play {
    position: absolute;
    bottom: 50%;
    left: 40%;
    background-color: gray;
    color: white;
    font-size: 20px;
  }
  .descreption-hidden {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3; /* number of lines to show */
                line-clamp: 3; 
        -webkit-box-orient: vertical;
  }
</style>