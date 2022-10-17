<template>
    <div class="container mx-auto">
        <upcoming-movies></upcoming-movies>
        <popular-movies></popular-movies>
    </div>
</template>
<script>
import PopularMovies from './PopularMovies.vue'
import UpcomingMovies from './UpcomingMovie.vue'
export default {
    data() {
        return {

        }
    },
    components: {
        PopularMovies,
        UpcomingMovies
    }
}
</script>
<style>

</style>