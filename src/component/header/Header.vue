<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
  <router-link
    to="/"
    tag="a"
    class="navbar-brand"
    active-class="active">
    <img src="/src/assets/image/Logo.png" alt="" :style="{maxWidth: 50 + 'px'}">
  </router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <ul class="navbar-nav mr-auto mt-lg-0">
      <li class="nav-item active">
        <router-link
          tag="a"
          to="/"
          class="nav-link"
          active-class="active">
          Movies <span class="sr-only">(current)</span>
        </router-link>
      </li>
      <li class="nav-item active">
        <router-link
          tag="a"
          to="/actors"
          class="nav-link"
          active-class="active">
          Actors <span class="sr-only">(current)</span>
        </router-link>
      </li>
      <li class="nav-item active">
        <router-link
          tag="a"
          to="/profile"
          class="nav-link"
          active-class="active"
          v-if="this.$store.getters.isUserLoggedIn">
          Profile <span class="sr-only">(current)</span>
        </router-link>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <div class="input-group">
      <div class="input-group-append dropdown show"
      @blur="showSearchResult = false">
      <input 
        ref="searchBox"
        type="text" 
        class="form-control dropdown-toggle" 
        placeholder="Search..." 
        @input="debounceSearch"
        v-model="searchTerm"
        id="dropdownMenuLink" 
        data-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="false"
        >
        <div 
          class="dropdown-menu bg-secondary" 
          aria-labelledby="dropdownMenuLink"
          style="width: 300px">
          <ul v-if="showSearchResult" class="list-unstyled">
            <li 
              :key="index" 
              v-for="(movie, index) in searchResult" 
              class="d-flex border-bottom" 
              @click="redirectedSearch(movie.id)"
              >
              <img :src="posterPath(movie.poster_path)" alt="" class="mt-1" :style="{width: 40 + 'px', height: 48 + 'px'}">
              <span class="text-light ml-2"> {{ movie.title }}</span>
            </li>
          </ul>
          <ul class="list-unstyled w-75" v-if="searchResult.length == 0 && showSearchResult">
            <li>No result found for "{{searchTerm}}"</li>
          </ul>
        </div>
          <account-drop-down></account-drop-down>
      </div>
    </div>
    </form>
  </div>
</nav>
  </div>
</template>

<script>
import axios from 'axios'
import AccountDropDown from './AccountDropDown.vue'
export default {
  data() {
    return {
      searchResult: [],
      searchTerm: "",
      showSearchResult: false,
    }
  },
  components: {
    AccountDropDown
  },
  mounted() {
    this.keyboardEvent()
  },
  methods: {
    debounceSearch() {
      if(this.searchTerm != ""){
        this.fetchSearch(event.target.value)
      } else {
        this.searchResult = []
        this.showSearchResult = false
      }
    },
    async fetchSearch(term) {
      try {
        const response = await axios.get("https://api.themoviedb.org/3/search/movie?api_key=f03adac0126c749980d255aeb2cfd676&query=" + term)
        this.searchResult = response.data.results
        this.showSearchResult = (response.data.results) ? true : false;
      }catch (error) {
        console.log(error)
      }
    },
    handleFocus() {
      if(this.searchTerm != "") {
        this.showSearchResult = true
      } else{
        this.showSearchResult = false
      }
    },
    keyboardEvent() {
      let windowObj = this
      window.addEventListener("keypress", (e)=> {
        if(e.keyCode == "47") {
          e.preventDefault()
          windowObj.$refs.searchBox.focus()
        }
      })
      window.addEventListener("keydown", (e) => {
        if(e.key == "Escape") {
          this.showSearchResult = false
        }
      })
    },
    posterPath(poster_path) {
      return "https://image.tmdb.org/t/p/w500/" + poster_path
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

</style>