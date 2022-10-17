<template>
    <div   
        class="container fixed top-0 left-0 w-100 h-100 d-flex items-center shadow bg-dark"
        tabindex="0"
        v-show="value">
        <div class="row">

            <!-- Modal -->
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content bg-dark">
                <div class="modal-body">
                    <button 
                        @click="close" 
                        type="button" 
                        class="close text-light mb-2" 
                        data-dismiss="modal" 
                        aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <img 
                        :src="mediaURL"
                        v-if="!isVideo"
                        :style="{width: 100 + '%'}" 
                        >
                    <iframe 
                        allow="autoplay: encrypted-media"
                        :style="{width: 100 + '%', height: 60 + 'vh'}"
                        frameborder="0"
                        autoplay="1"
                        mute="1"
                        webkitallowfullscreen 
                        mozallowfullscreen 
                        allowfullscreen
                        v-if="isVideo"
                        :src="mediaURL"></iframe>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            required: true
        },
        mediaURL: {
            required: true
        },
        isVideo: {
            required: true
        }
    },
    methods: {
        close() {
            this.$emit("input", !this.value)
        }
    }
}
</script>

<style>

</style>