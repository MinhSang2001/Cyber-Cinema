<template>
  <div class="dropdown">
    <img 
        src="src/assets/image/avatar.jpg" 
        class="dropdown-toggle rounded-circle ml-2" 
        style="width: 40px" 
        alt=""
        data-toggle="dropdown" 
        aria-expanded="false">
    <div class="dropdown-menu">
        <a 
          class="dropdown-item" 
          href="#">Account Setting
        </a>
        <a 
          class="dropdown-item" 
          href="#">Support
        </a>
        <a 
          @click.prevent="logout"
          class="dropdown-item" 
          href="#">Log out
        </a>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        isOpen: false
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("setUserLoggedIn", false)
      }
    }
}
</script>

<style>

</style>