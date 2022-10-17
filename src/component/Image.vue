<template>
  <div class="container px-3 py-3">
    <h2 class="text-xl mb-4">Image</h2>
    <div class="row">
        <div 
            class="col-6 col-md-3 col-sm-6 mb-4" 
            :key="image.backdrops" 
            v-for="image in images"
            data-toggle="modal" 
            data-target="#exampleModalCenter">
            <img 
                @click="openModel(image)"
                :src="imageProfileMovie(image)" 
                alt="" 
                :style="{width: 200 + 'px', height: 160 + 'px'}">
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
        images: {
            required: true
        }
    },
    methods: {
        imageProfileMovie(image){
            if(image.file_path) {
            return "https://image.tmdb.org/t/p/w300" + image.file_path
            } else {
                return "https://via.placeholder.com/300x450"
            }
        },
        openModel(image) {
            let imageFullPath = ""
            if(image.file_path) {
                imageFullPath = "https://image.tmdb.org/t/p/original/" + image.file_path
            } else {
                imageFullPath = "https://via.placeholder.com/300x450"
            }
            this.$emit("on-image-click", imageFullPath)
        }
    }
}
</script>

<style>

</style>