<template>
  <div class="return-header" title="回到顶部" @click="handleClick" v-if="isShow">
      <i></i>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isShow: false
      }
    },

    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },

    props: {},

    watch: {},

    methods: {
      handleClick: function () {
        window.scrollTo(0, 0)
      },

      handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (!scrollTop) {
          this.isShow = false
        } else {
          this.isShow = true
        }
      },

      destroyed () {
        window.removeEventListener('scroll', this.handleScroll)
      }
    }
  }
</script>

<style>
</style>