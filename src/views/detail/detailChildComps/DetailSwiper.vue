<template>
  <swiper class="d-swiper">
    <swiper-item v-for="item in topImages" :key="item">
      <img :src="item" />
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper';

  export default {
    name: "DetailSwiper",
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .d-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
