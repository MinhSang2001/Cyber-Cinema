<template>
        <div class="col-6 col-sm-6 col-md-3 col-sm-6">
          <router-link 
            :to="`/movie/${movie.id}`">
            <img :src="posterPath" alt="" class="mt-4" :style="{width: 100 + '%'}">
          <h6 class="mt-2 text-primary text-truncate po-name">{{movie.title}}</h6>
          </router-link>
          <div class="d-flex mb-2">
            <i class="fa-solid fa-star text-warning mt-1"></i>
            <span class="ml-2">{{ movie.vote_average * 10 }}% | {{ movie.release_date }}</span>
          </div>
          <span class="text-sm text-secondary flex-wrap" :style="{maxWidth: 80 + 'px'}">
            <span v-for="(genre, index) in movie.genre_ids" :key="genre">{{ genreTypeName(genre, index) }}</span>
          </span>
        </div>        
</template>

<script>
export default {
  props: {
    movie: {
      required: true,
    },
    genres: {
      required: true,
    }
  },
  data() {
    return {

    };
  },
  computed: {
    posterPath() {
      if(this.movie.poster_path) {
        return "https://image.tmdb.org/t/p/w500/" + this.movie.poster_path
      } else {
        return "https://via.placeholder.com/300x450"
      }
    },
  },
  methods: {
    genreTypeName(genraId, index) {
      for (const item of this.genres) {
        if(item.id == genraId) {
          if(this.movie.genre_ids.length - 1 == index) {
            return item.name
          } else {
            return item.name + ", "
          }
        }
      }
      // if (this.genres[genraId]) {
      //   if(this.genres.length - 1 == index) {
      //     return this.genres[genraId].name;
      //   } else {
      //     return this.genres[genraId].name + ","
      //   }
      // }
    }
  }
}
</script>

<style>
  img:hover { 
    opacity: 0.9;
    cursor: pointer;
  }
  .po-name:hover {
    opacity: 0.9;
    cursor: pointer;
  }
</style>