<template>
  <div>
    <header-nav class="container justify-content-between"></header-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderNav from './component/header/Header.vue'
export default {
  data() {
    return {

    };
  },
  components: {
    HeaderNav
  }
}
</script>

<style>

</style>
