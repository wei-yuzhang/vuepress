<template>
  <div class="image-view">
    <div class="image-content" :class="{ 'image-small': flag === 'small', 'image-large': flag === 'large' }">
      <img :alt="imageTitle" :title="imageTitle" :src="imageUrl" @click="handleImageClick" />
      <a v-if="flag === 'large'" target="_blank" class="view-original-image" data-pop-btn="1" :href="imageUrl">查看原图</a>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        flag: 'small' // 显示放大还是缩小的图片 small large
      }
    },

    props: {
      imageTitle: String,
      imageUrl: String
    },

    methods: {
      handleImageClick: function () {
        this.flag === 'small' ? this.flag = 'large' : this.flag = 'small'
      }
    }
  }
</script>

<style>
</style>