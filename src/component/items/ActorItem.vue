<template>
    <div class="col-6 col-sm-6 col-md-4 col-lg-3">
        <router-link
            :to="`/actors/${this.actor.id}`">
        <img 
            :src="profileImage" 
            alt="">
        <h5 class="text-decoration-none">{{ actor.name }}</h5>
        <p style="color: #a6a6a6">{{ knownFor }}</p>
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        actor: {
            required: true
        }
    },
    computed: {
        profileImage() {
            if(this.actor.profile_path) {
                return "https://image.tmdb.org/t/p/w235_and_h235_face" + 
                this.actor.profile_path
            } else {
                return "https://via.placeholder.com/235x235"
            }
        },
        knownFor() {
            let knownStr = ""
            for(let i ; i < this.actor.known_for.length -1; i++) {
                knownStr == this.actor.known_for[i].title
            }
            return knownStr
        }
    }
}
</script>

<style>

</style>