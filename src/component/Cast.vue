<template>
  <div class="container px-3 py-3 border-bottom">
    <h2 class="text-xl mb-4">Cast</h2>
        <div class="row" >
        <div class="col-6 col-md-3 col-sm-6" :key="cast.id" v-for="cast in casts">
            <img 
                :src="castProfileImage(cast)" 
                alt="" 
                :style="{width: 190 + 'px', height: 270 + 'px'}">
            <p class="mt-2 text-light text-truncate" :style="{maxWidth: 220 + 'px'}"> {{ cast.name }}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        casts: {
            required: true
        },

    },
    methods: {
        castProfileImage(cast) {
            if(cast.profile_path) {
            return "https://image.tmdb.org/t/p/w300" + cast.profile_path

            } else {
                return "https://via.placeholder.com/300x450"
            }
        }
     }
}
</script>

<style>

</style>